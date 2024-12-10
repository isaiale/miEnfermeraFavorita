import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Login from '../componentes/login';
import { AuthProviderMock } from '../__mocks__/AuthProviderMock'; // Mock de AuthContext

// Mock para fetch
global.fetch = jest.fn(() =>
    Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ token: 'mockToken', redirect: '/dashboard' }),
    })
);

// Mock para window.location.href
delete window.location;
window.location = { href: '' };

describe('Componente Login', () => {
    beforeEach(() => {
        fetch.mockClear();
    });

    test('Realiza una llamada fetch con los datos correctos al enviar el formulario', async () => {
        render(
            <MemoryRouter>
                <AuthProviderMock>
                    <Login />
                </AuthProviderMock>
            </MemoryRouter>
        );

        fireEvent.change(screen.getByPlaceholderText(/ingresa tu correo electrónico/i), {
            target: { value: 'test@example.com' },
        });
        fireEvent.change(screen.getByPlaceholderText(/ingresa tu contraseña/i), {
            target: { value: 'password123' },
        });

        fireEvent.click(screen.getByRole('button', { name: /iniciar sesión/i }));

        await waitFor(() => {
            expect(fetch).toHaveBeenCalledWith('https://back-end-enfermera.vercel.app/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    correo: 'test@example.com',
                    contraseña: 'password123',
                }),
            });

            expect(window.location.href).toBe('/dashboard'); // Verifica que se simuló la redirección
        });
    });
});
