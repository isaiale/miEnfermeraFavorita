import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AuthContext } from '../autenticar/AuthProvider';
import DetalleProducto from '../componentes/detalleProductos';

// Mock de useParams
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useParams: () => ({ idProductos: '123' }),
}));

// Mock de fetch
global.fetch = jest.fn();

// Mock de Swal
jest.mock('sweetalert2', () => ({
    fire: jest.fn(),
}));

const mockProducto = {
    _id: '123',
    nombre: 'Producto de prueba',
    descripcion: 'Descripción del producto de prueba.',
    precio: 100,
    inventario: 5,
    sexo: 'Unisex',
    imagenes: [{ url: 'https://via.placeholder.com/150' }],
    categoria: { nombre: 'Chalecos' },
    talla: ['Ch', 'M', 'G', 'XL'],
};

const mockUser = {
    _id: 'user123',
    nombre: 'John Doe',
    correo: 'john@example.com',
};

const renderWithContext = (ui, { isAuthenticated = true, user = mockUser } = {}) => {
    return render(
        <AuthContext.Provider value={{ isAuthenticated, user }}>
            <MemoryRouter>{ui}</MemoryRouter>
        </AuthContext.Provider>
    );
};

describe('DetalleProducto', () => {
    beforeEach(() => {
        fetch.mockClear();
    });

    test('Renderiza correctamente los detalles del producto', async () => {
        // Simula la respuesta del fetch para obtener el producto
        fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => mockProducto,
        });

        renderWithContext(<DetalleProducto />);

        // Verifica que el spinner de carga se muestre inicialmente
        expect(screen.getByText(/Cargando/i)).toBeInTheDocument();

        // Espera que el producto se cargue y se rendericen sus detalles
        await waitFor(() => {
            expect(screen.getByText(mockProducto.nombre)).toBeInTheDocument();
            expect(screen.getByText(mockProducto.descripcion)).toBeInTheDocument();
            expect(screen.getByText(`$${mockProducto.precio}`)).toBeInTheDocument();
            expect(screen.getByText(/Inventario:/i)).toBeInTheDocument();
        });

        // Verifica que las imágenes del producto se rendericen
        const image = screen.getByAltText(/Imagen principal/i);
        expect(image).toHaveAttribute('src', mockProducto.imagenes[0].url);

        // Verifica que las tallas disponibles se rendericen
        mockProducto.talla.forEach((talla) => {
            expect(screen.getByText(talla)).toBeInTheDocument();
        });
    });

});
