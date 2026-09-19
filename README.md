# Gourmet Chef

Created by Nimai Garg — https://www.linkedin.com/in/nimaigarg

React web application with Firebase sign-in and profile storage, a Netlify recipe function, and USDA food search.

## Local development

1. Install Node.js 22 and run `npm ci`.
2. Copy `.env.example` to `.env` and fill in the Firebase web app values from project `gourmetai-c3818`. The example intentionally contains no credentials.
3. Set `OPENAI_API_KEY` to a valid server-side key. Never use a `REACT_APP_` prefix for private keys. The previously embedded OpenAI and Mailchimp credentials must be revoked/rotated by their owner; removing them from source does not remove Git history.
4. Run `npm run start:api` in one terminal and `npm start` in another. Open http://localhost:3000. The development proxy forwards recipe requests to port 5001.
5. Restart both processes after changing `.env`.

USDA search uses a limited `DEMO_KEY` unless `REACT_APP_USDA_API_KEY` is set. USDA browser keys are public. Replace the previously embedded USDA key if still active.

## Netlify

`netlify.toml` configures `npm run build`, the `build` publish folder, Netlify Functions, and the single-page-app route fallback. The Express server is only for local development; Netlify runs `netlify/functions/chat.js` directly.

Add the Firebase `REACT_APP_FIREBASE_*` values to Netlify's build environment. Make `OPENAI_API_KEY` and either `FIREBASE_API_KEY` or `REACT_APP_FIREBASE_API_KEY` available to Functions. The server-side Firebase web API key must belong to the same project as the frontend. `OPENAI_MODEL` is optional and defaults to `gpt-4o`. Rebuild after frontend environment changes.

Enable Email/Password and Google providers in Firebase Authentication. Add the actual Netlify site/custom domain and localhost to Firebase's authorized domains. Ensure Firestore is available for the project. Recipe requests require a Firebase ID token and verify it with Firebase before using OpenAI.

Deploy the updated `firestore.rules` separately using the Firebase CLI when releasing the newsletter changes. New subscribers are stored as separate documents with an `email` field. Existing `newsletter/users` data remains untouched. The new rules prevent public reads, updates, and deletion of subscriber addresses; only validated new subscriptions are accepted.

`app.js` is a legacy Mailchimp service, unused by the React newsletter form. It now requires `MAILCHIMP_API_KEY` and `MAILCHIMP_LIST_ID` if run separately.

## Verification

- `CI=true npm run build`
- `CI=true npm test -- --watchAll=false --runInBand`
- `npm run test:api`

Automated tests mock external services; they do not create real accounts, send emails, or consume OpenAI quota. Live sign-in, profile persistence, USDA quota, and recipe generation must also be checked with the deployment's real configuration. No production deployment or Firebase rule publication is performed by these commands.

References: [Netlify configuration](https://docs.netlify.com/build/configure-builds/file-based-configuration/) and [Firebase account verification endpoint](https://firebase.google.com/docs/reference/rest/auth#section-get-account-info).
