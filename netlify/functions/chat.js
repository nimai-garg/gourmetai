const axios = require('axios');
const json = (statusCode, body) => ({ statusCode,
  headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' }, body: JSON.stringify(body) });
exports.handler = async function (event) {
  if (event.httpMethod !== 'POST') return json(405, { error: 'Use POST for recipe requests.' });
  if (event.body && Buffer.byteLength(event.body, 'utf8') > 32768)
    return json(413, { error: 'Recipe request is too large.' });
  let body;
  try { body = JSON.parse(event.body || '{}'); }
  catch { return json(400, { error: 'The request must contain valid JSON.' }); }
  const prompt = body?.prompt;
  if (typeof prompt !== 'string' || !prompt.trim() || prompt.length > 12000)
    return json(400, { error: 'Enter a recipe request between 1 and 12,000 characters.' });
  const authorization = event.headers?.authorization || event.headers?.Authorization || '';
  if (!authorization.startsWith('Bearer ') || !authorization.slice(7).trim())
    return json(401, { error: 'Please sign in to generate recipes.' });
  const firebaseKey = process.env.FIREBASE_API_KEY || process.env.REACT_APP_FIREBASE_API_KEY;
  if (!process.env.OPENAI_API_KEY || !firebaseKey)
    return json(503, { error: 'Recipe generation is not configured. Please contact the site owner.' });
  try {
    const account = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:lookup',
      { idToken: authorization.slice(7) }, { params: { key: firebaseKey }, timeout: 10000 });
    if (!account.data.users?.[0]?.localId || account.data.users[0].disabled)
      return json(401, { error: 'Please sign in again to generate recipes.' });
  } catch (error) {
    const invalidToken = ['INVALID_ID_TOKEN', 'TOKEN_EXPIRED', 'USER_DISABLED', 'USER_NOT_FOUND']
      .includes(error.response?.data?.error?.message);
    return json(invalidToken ? 401 : 503, { error: invalidToken
      ? 'Please sign in again to generate recipes.' : 'Sign-in verification is unavailable. Please try again.' });
  }
  try {
    const response = await axios.post('https://api.openai.com/v1/chat/completions', {
      model: process.env.OPENAI_MODEL || 'gpt-4o',
      messages: [
        { role: 'system', content: 'You are a helpful recipe assistant. Respect supplied dietary restrictions and allergies. Nutritional values are estimates.' },
        { role: 'user', content: prompt.trim() }
      ], temperature: 0.7, max_completion_tokens: 1800, store: false
    }, { headers: { Authorization: 'Bearer ' + process.env.OPENAI_API_KEY }, timeout: 25000 });
    const choice = response.data.choices?.[0];
    if (choice?.finish_reason === 'length')
      return json(502, { error: 'The recipe was cut short. Please try a simpler request.' });
    const reply = choice?.message?.content;
    if (typeof reply !== 'string' || !reply.trim()) throw new Error('Empty recipe');
    return json(200, { reply: reply.trim() });
  } catch (error) {
    const status = error.response?.status === 429 ? 429 : 502;
    return json(status, { error: status === 429
      ? 'Recipe generation is busy or its quota has been reached. Please try again later.'
      : 'Unable to generate a recipe right now. Please try again.' });
  }
};

// Enforced by Netlify at the edge; the local Express proxy does not apply this rule.
exports.config = {
  rateLimit: { windowLimit: 10, windowSize: 60, aggregateBy: ['ip', 'domain'] }
};
