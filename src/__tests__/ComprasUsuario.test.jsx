import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ComprasUsuario from '../componentes/ComprasUsuario';
import { AuthContext } from '../autenticar/AuthProvider';

// Mock de fetch
global.fetch = jest.fn();

// Mock para el contexto de autenticación
const mockUser = {
    _id: 'mockUserId',
    nombre: 'John',
    correo: 'john@example.com',
};

const renderWithContext = (ui, { isAuthenticated = true, user = mockUser } = {}) => {
    return render(
        <AuthContext.Provider value={{ isAuthenticated, user }}>
            <MemoryRouter>{ui}</MemoryRouter>
        </AuthContext.Provider>
    );
};

describe('ComprasUsuario', () => {
    beforeEach(() => {
        fetch.mockClear();
    });

    test('Muestra mensaje cuando no hay compras', async () => {
        // Simula la respuesta de fetch con un array vacío
        fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => [],
        });

        renderWithContext(<ComprasUsuario />);

        // Verifica que se muestra el mensaje
        await waitFor(() => {
            expect(screen.getByText(/No hay compras registradas/i)).toBeInTheDocument();
        });
    });

});
