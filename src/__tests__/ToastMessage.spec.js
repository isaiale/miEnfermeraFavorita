import React from 'react'; // Añadir esta línea
import { render, screen } from '@testing-library/react';
import ToastMessage from '../utilidad/Toast'; // Ajusta la ruta si es necesario

describe('ToastMessage', () => {
  const mockOnClose = jest.fn();
  
  it('Renderizara correctamente con el color correcto', () => {
    render(
      <ToastMessage 
        showToast={true} 
        message="Mensaje de prueba" 
        onClose={mockOnClose} 
        toastColor="success" 
      />
    );
    
    expect(screen.getByText('¡Éxito!')).toBeInTheDocument();
    expect(screen.getByText('Mensaje de prueba')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument(); // El Toast tiene un botón de cierre
  });

  it('Llama a onClose cuando el Toast esté cerrado', () => {
    render(
      <ToastMessage 
        showToast={true} 
        message="Mensaje de prueba" 
        onClose={mockOnClose} 
        toastColor="success" 
      />
    );
    
    // Simulamos el clic en el botón de cierre
    screen.getByRole('button').click();
    expect(mockOnClose).toHaveBeenCalled();
  });

  it('Renderizara con el color de error predeterminado cuando roastColor no es válido', () => {
    render(
      <ToastMessage 
        showToast={true} 
        message="Mensaje de error" 
        onClose={mockOnClose} 
        toastColor="invalidColor" 
      />
    );

    expect(screen.getByText('Error')).toBeInTheDocument();
    expect(screen.getByText('Mensaje de error')).toBeInTheDocument();
  });

  it('No debería representar Toast cuando showToast es falso', () => {
    render(
      <ToastMessage 
        showToast={false} 
        message="No debe aparecer" 
        onClose={mockOnClose} 
        toastColor="success" 
      />
    );
    
    const toast = screen.queryByText('No debe aparecer');
    expect(toast).toBeNull(); // No debe estar en el DOM
  });
});
