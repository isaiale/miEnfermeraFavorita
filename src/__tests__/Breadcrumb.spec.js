import React from 'react';
import { render } from '@testing-library/react';
import Breadcrumb from '../utilidad/migapan.jsx'; // Ajusta la ruta si es necesario

describe('Breadcrumb Component', () => {
  it('Representa el componente de ruta de navegación correctamente', () => {
    const { getByText, container } = render(<Breadcrumb path="Home" />);
    
    // Verificar que el texto 'Home' esté presente
    const pathElement = getByText('Home');
    expect(pathElement).toBeInTheDocument();
    
    // Verificar que hay un enlace con href="/"
    const links = container.querySelectorAll('a.breadcrumb-link');
    expect(links.length).toBe(2); // Debe haber dos enlaces en el breadcrumb
    expect(links[0].getAttribute('href')).toBe('/');
    expect(links[1].getAttribute('href')).toBe('/');
  });

  it('Representa los iconos SVG correctos', () => {
    const { container } = render(<Breadcrumb path="Details" />);
    
    // Verificar que los iconos SVG están presentes
    const icons = container.querySelectorAll('svg.breadcrumb-icon');
    expect(icons.length).toBeGreaterThan(0); // Debe haber al menos un ícono SVG
  });

  it('Representa el divisor de ruta de navegación correctamente', () => {
    const { container } = render(<Breadcrumb path="Settings" />);
    
    // Verificar que los divisores (separadores) entre los elementos de breadcrumb estén presentes
    const dividers = container.querySelectorAll('svg.breadcrumb-divider');
    expect(dividers.length).toBe(2); // Debe haber dos divisores
  });
});
