import { Pagos_Renta_Vista_Admin, Ventas_Vista_Admin } from "./urlSitioWeb";

export const getPagosRenta = async () => {    

    const token = localStorage.getItem('authToken');
  
    try {
      const response = await fetch(Pagos_Renta_Vista_Admin, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
  
      if (!response.ok) {
        throw new Error('Error en la solicitud');
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  };
  
  export const getVentasTotales = async () => {
    // const apiUrl = 'https://tudominio.com/api/ventas-totales';
  
    const token = localStorage.getItem('authToken');
  
    try {
      const response = await fetch(Ventas_Vista_Admin, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
  
      if (!response.ok) {
        throw new Error('Error en la solicitud');
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  };
  