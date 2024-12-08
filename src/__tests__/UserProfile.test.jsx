import React from 'react';
import { render, screen } from '@testing-library/react';
import { AuthContext } from '../autenticar/AuthProvider';
import UserProfile from '../componentes/PerfilUser';
import { BrowserRouter as Router } from 'react-router-dom';

describe('UserProfile Component', () => {
  it('renderiza el perfil de usuario correctamente', async () => {
    // Simulación de contexto de autenticación
    const mockAuthContextValue = {
      isAuthenticated: true,
      user: {
        _id: '12345',
        nombre: 'Juan',
        apellido: 'Pérez',
        correo: 'juan.perez@example.com',
        numeroTelefono: '123-456-7890',
        estado: 'ACTIVO',
        fechaCreado: '2023-11-25T00:00:00.000Z',
      },
    };

    // Mock para fetch de la foto de perfil
    global.fetch = jest.fn().mockImplementation((url) => {
      if (url.includes('/foto')) {
        return Promise.resolve({
          ok: true,
          json: () =>
            Promise.resolve({
              fotoPerfil: [{ url: 'http://example.com/foto.jpg' }],
            }),
        });
      }
      return Promise.reject(new Error('URL no reconocida en el test.'));
    });

    render(
      <AuthContext.Provider value={mockAuthContextValue}>
        <Router>
          <UserProfile />
        </Router>
      </AuthContext.Provider>
    );

    // Verifica si los datos del usuario se renderizan correctamente
    expect(await screen.findByText('Juan Pérez')).toBeInTheDocument();
    expect(await screen.findByText('juan.perez@example.com')).toBeInTheDocument();
    expect(await screen.findByText('123-456-7890')).toBeInTheDocument();
    expect(await screen.findByText('ACTIVO')).toBeInTheDocument();
  });
});
