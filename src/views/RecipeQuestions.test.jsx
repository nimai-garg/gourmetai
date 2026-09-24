import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import RecipeQuestions from './RecipeQuestions';
jest.mock('firebase/firestore', () => ({ doc: jest.fn(), getDoc: jest.fn().mockResolvedValue({ exists: () => false }), setDoc: jest.fn() }));
jest.mock('../firebaseConfig', () => ({ auth: { onAuthStateChanged: () => () => {} }, db: {} }));
test('returns from confirmation to the last question instead of an empty screen', () => {
  render(<MemoryRouter><RecipeQuestions /></MemoryRouter>);
  fireEvent.click(screen.getByRole('button', {name: 'Continue'}));
  for (let i=0;i<6;i++) fireEvent.click(screen.getByText('Skip Question'));
  expect(screen.getByRole('button', {name: 'Confirm'})).toBeInTheDocument();
  fireEvent.click(screen.getByText('Go Back'));
  expect(screen.getByText(/Question #6/)).toBeInTheDocument();
});
