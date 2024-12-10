import React from 'react';
import { render } from '@testing-library/react';
import { BtnColorRosa } from '../utilidad/botones'; // Ajusta la ruta si es necesario

describe('BtnColorRosa Component', () => {
  it('Renderizar el botón con el nombre correcto', () => {
    const { getByText } = render(<BtnColorRosa nombre="Test Button" onClick={() => {}} />);
    const button = getByText('Test Button');
    expect(button).toBeInTheDocument();
  });
});
