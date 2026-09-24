const { test, beforeEach } = require('node:test');
const assert = require('node:assert/strict');
const axios = require('axios');
const { handler } = require('../netlify/functions/chat');
const event = (body = { prompt: 'Make a lentil soup' }) => ({ httpMethod: 'POST', headers: { authorization: 'Bearer test-token' }, body: JSON.stringify(body) });
let calls;
beforeEach(() => {
  process.env.OPENAI_API_KEY = 'test-key';
  process.env.FIREBASE_API_KEY = 'test-firebase';
  calls = [];
  axios.post = async (...args) => {
    calls.push(args);
    return args[0].includes('accounts:lookup')
      ? { data: { users: [{ localId: 'test-user' }] } }
      : { data: { choices: [{ message: { content: '  Lentil soup recipe  ' } }] } };
  };
});
test('rejects invalid methods and malformed JSON without calling providers', async () => {
  assert.equal((await handler({ httpMethod: 'GET' })).statusCode, 405);
  assert.equal((await handler({ ...event(), body: '{' })).statusCode, 400);
  assert.equal(calls.length, 0);
});
test('validates empty, null, non-string and oversized prompts', async () => {
  for (const body of [null, {}, { prompt: ' ' }, { prompt: 2 }, { prompt: 'a'.repeat(12001) }])
    assert.equal((await handler(event(body))).statusCode, 400);
  assert.equal(calls.length, 0);
});
test('requires sign-in and configured credentials', async () => {
  assert.equal((await handler({ ...event(), headers: {} })).statusCode, 401);
  delete process.env.OPENAI_API_KEY;
  assert.equal((await handler(event())).statusCode, 503);
  assert.equal(calls.length, 0);
});
test('verifies Firebase identity before generating a recipe', async () => {
  const response = await handler(event());
  assert.equal(response.statusCode, 200);
  assert.deepEqual(JSON.parse(response.body), { reply: 'Lentil soup recipe' });
  assert.equal(calls.length, 2);
  assert.equal(calls[0][1].idToken, 'test-token');
  assert.equal(calls[1][1].messages[1].content, 'Make a lentil soup');
});
test('rejects invalid and disabled accounts without generating recipes', async () => {
  axios.post = async () => ({ data: { users: [{ localId: 'user', disabled: true }] } });
  assert.equal((await handler(event())).statusCode, 401);
  axios.post = async () => { throw { response: { data: { error: { message: 'TOKEN_EXPIRED' } } } }; };
  assert.equal((await handler(event())).statusCode, 401);
});
test('returns safe errors for provider failures and empty responses', async () => {
  for (const status of [429, 500]) {
    axios.post = async url => {
      if (url.includes('accounts:lookup')) return { data: { users: [{ localId: 'user' }] } };
      throw { response: { status }, message: 'sensitive provider detail' };
    };
    const response = await handler(event());
    assert.equal(response.statusCode, status === 429 ? 429 : 502);
    assert.ok(!response.body.includes('sensitive'));
  }
  axios.post = async url => ({ data: url.includes('accounts:lookup') ? { users: [{ localId: 'user' }] } : { choices: [] } });
  assert.equal((await handler(event())).statusCode, 502);
});

test('rejects oversized bodies before calling providers', async () => {
  assert.equal((await handler({ ...event(), body: ' '.repeat(32769) })).statusCode, 413);
  assert.equal(calls.length, 0);
});
test('does not display a truncated recipe as complete', async () => {
  axios.post = async url => ({ data: url.includes('accounts:lookup')
    ? { users: [{ localId: 'user' }] }
    : { choices: [{ finish_reason: 'length', message: { content: 'Incomplete recipe' } }] } });
  const response = await handler(event());
  assert.equal(response.statusCode, 502);
  assert.match(JSON.parse(response.body).error, /cut short/);
});
