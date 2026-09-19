import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import RecipeGenerator from './RecipeGenerator';
import axios from 'axios';
import { getDoc } from 'firebase/firestore';
import { auth } from '../firebaseConfig';
jest.mock('axios');
jest.mock('firebase/firestore', () => ({ doc: jest.fn(), getDoc: jest.fn() }));
jest.mock('../firebaseConfig', () => ({
  auth: { currentUser: { getIdToken: jest.fn().mockResolvedValue('test-token') }, onAuthStateChanged: jest.fn() }, db: {}, logOut: jest.fn()
}));
beforeEach(() => {
  auth.currentUser.getIdToken.mockResolvedValue('test-token');
  auth.onAuthStateChanged.mockImplementation(callback => { callback({ uid: 'test-user' }); return () => {}; });
  getDoc.mockResolvedValue({ exists: () => false });
});
test('generates a recipe even when a new user has no saved profile', async () => {
  axios.post.mockResolvedValue({ data: { reply: 'Lentil soup' } });
  render(<MemoryRouter><RecipeGenerator /></MemoryRouter>);
  expect(await screen.findByText('Lentil soup')).toBeInTheDocument();
  expect(axios.post).toHaveBeenCalledWith('/.netlify/functions/chat', expect.any(Object), expect.objectContaining({ headers: { Authorization: 'Bearer test-token' } }));
});
test('shows a failed request and allows the user to retry', async () => {
  axios.post.mockRejectedValueOnce({ response: { data: { error: 'Please try again.' } } })
    .mockResolvedValueOnce({ data: { reply: 'Successful retry recipe' } });
  render(<MemoryRouter><RecipeGenerator /></MemoryRouter>);
  expect(await screen.findByRole('alert')).toHaveTextContent('Please try again.');
  fireEvent.click(screen.getByRole('button', { name: 'Next Dish' }));
  expect(await screen.findByText('Successful retry recipe')).toBeInTheDocument();
});
test('reports profile failures instead of loading forever', async () => {
  getDoc.mockRejectedValueOnce(new Error('Offline'));
  render(<MemoryRouter><RecipeGenerator /></MemoryRouter>);
  await waitFor(() => expect(screen.getByRole('alert')).toHaveTextContent('Unable to load your preferences'));
  expect(screen.getByRole('button', { name: 'Next Dish' })).toBeDisabled();
});
