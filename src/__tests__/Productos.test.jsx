import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Productos from '../componentes/Productos';

// Mock de fetch
global.fetch = jest.fn();

// Mock de useParams
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useParams: () => ({ categoriaId: 'mockCategoriaId' }),
}));

describe('Componente Productos', () => {
    beforeEach(() => {
        fetch.mockClear();
    });

    test('Carga y renderiza correctamente los datos', async () => {
        fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => Array.from({ length: 20 }, (_, i) => ({
                _id: `${i + 1}`,
                nombre: `Producto ${i + 1}`,
                precio: 100 + i,
                descuento: i % 2 === 0 ? 10 : 0,
                sexo: 'Unisex',
                imagenes: [{ url: `/img${i + 1}.png` }],
            })),
        });

        render(
            <MemoryRouter>
                <Productos />
            </MemoryRouter>
        );

        await waitFor(() => {
            expect(screen.getByText(/producto 1/i)).toBeInTheDocument();
            expect(screen.getByText(/producto 8/i)).toBeInTheDocument();
        });

        fireEvent.click(screen.getByRole('button', { name: /2/i })); // Usa getByRole

        await waitFor(() => {
            expect(screen.getByText(/producto 9/i)).toBeInTheDocument();
            expect(screen.getByText(/producto 16/i)).toBeInTheDocument();
        });
    });
});
