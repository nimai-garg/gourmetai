import { render, screen } from '@testing-library/react';
import App from './App';
import { auth, missingFirebaseConfig } from './firebaseConfig';
jest.mock('firebase/auth', () => ({ sendEmailVerification: jest.fn(), sendPasswordResetEmail: jest.fn() }));
jest.mock('./firebaseConfig', () => ({
  auth: { onAuthStateChanged: jest.fn() }, missingFirebaseConfig: []
}));
beforeEach(() => {
  auth.onAuthStateChanged.mockReturnValue(() => {});
  missingFirebaseConfig.length = 0;
  window.history.replaceState({}, '', '/dashboard');
});
test('shows a useful setup message when Firebase configuration is absent', () => {
  missingFirebaseConfig.push('apiKey');
  render(<App />);
  expect(screen.getByRole('heading', { name: /needs configuration/i })).toBeInTheDocument();
});
test('waits for authentication before rendering a protected route', () => {
  auth.onAuthStateChanged.mockReturnValue(() => {});
  render(<App />);
  expect(screen.getByRole('status')).toHaveTextContent('Loading your account');
});
test('redirects a signed-out visitor to login', async () => {
  auth.onAuthStateChanged.mockImplementation(callback => { callback(null); return () => {}; });
  render(<App />);
  expect(await screen.findByPlaceholderText(/email/i)).toBeInTheDocument();
  expect(window.location.pathname).toBe('/login');
});
