import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import NutritionalData from './NutritionalData';
import axios from 'axios';
jest.mock('axios');
test('does not search empty input and preserves zero nutrient values', async () => {
  axios.get.mockResolvedValue({ data: { totalPages: 1, foods: [{ description: 'Water', foodNutrients: [{ nutrientId: 1008, value: 0 }] }] } });
  render(<MemoryRouter><NutritionalData /></MemoryRouter>);
  expect(axios.get).not.toHaveBeenCalled();
  fireEvent.change(screen.getByPlaceholderText('Enter an ingredient...'), { target: { value: 'water' } });
  expect(await screen.findByText('Water')).toBeInTheDocument();
  expect(screen.getByText('0')).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Next' })).toBeDisabled();
});
test('resets pagination when the ingredient changes', async () => {
  axios.get.mockResolvedValue({ data: { totalPages: 10, foods: [{ description: 'Food', foodNutrients: [] }] } });
  render(<MemoryRouter><NutritionalData /></MemoryRouter>);
  const input = screen.getByPlaceholderText('Enter an ingredient...');
  fireEvent.change(input, { target: { value: 'rice' } });
  await screen.findByText('Food');
  fireEvent.click(screen.getByRole('button', { name: 'Next' }));
  await waitFor(() => expect(axios.get).toHaveBeenLastCalledWith(expect.any(String), expect.objectContaining({ params: expect.objectContaining({ pageNumber: 2 }) })));
  fireEvent.change(input, { target: { value: 'beans' } });
  await waitFor(() => expect(axios.get).toHaveBeenLastCalledWith(expect.any(String), expect.objectContaining({ params: expect.objectContaining({ query: 'beans', pageNumber: 1 }) })));
});
