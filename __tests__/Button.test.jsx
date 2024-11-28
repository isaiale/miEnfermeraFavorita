import React from 'react';
import { render } from '@testing-library/react';
import Button from './Button';

test('renders a button', () => {
  const { getByText } = render(<Button text="Click me" />);
  expect(getByText('Click me')).toBeInTheDocument();
});
