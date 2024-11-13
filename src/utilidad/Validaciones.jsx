// valida texto
const validarNombre = (nombre) => {
    return /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]{2,}$/.test(nombre);
};
//valida numero de telefono
const validarTelefono = (telefono) => {
    return telefono.length !== 10 || !/^[0-9]+$/.test(telefono);
};
// Valida correos
const validarEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};
// Valida contraseña
const getPasswordErrorMessage = (password) => {
    let errorMessage = 'La contraseña debe tener al menos:';

    if (password.length < 8) {
        errorMessage += ' 8 caracteres.';
    }

    if (!/[a-z]/.test(password)) {
        errorMessage += ' Una letra minúscula.';
    }

    if (!/[A-Z]/.test(password)) {
        errorMessage += ' Una letra mayúscula.';
    }

    if (!/\d/.test(password)) {
        errorMessage += ' Un número.';
    }

    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
        errorMessage += ' Un carácter especial (@#$%^&*).';
    }

    return errorMessage;
};

export { validarNombre, validarTelefono, validarEmail, getPasswordErrorMessage };
