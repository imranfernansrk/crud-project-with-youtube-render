import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import App from './App';

afterEach(()=>{
  cleanup()
})
test('renders learn react link', async () => {
  await render(<App />);
  const linkElement = await screen.getByText(/To-Do List Page/);
  await expect(linkElement).toBeInTheDocument();
});