import React from 'react';

const Elementos = (prop) => {
  return (
    <button onClick={prop.funcion} style={{ backgroundColor: prop.color, borderRadius: '5px', padding: '5px' }}>
      <span style={{ fontSize: '15px', color: 'black' }}>{prop.titulo}</span>
    </button>
  );
};

const Btn = (val) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
      <button style={{ width: '130px', height: '40px', backgroundColor: '#6a9cde', borderRadius: '5px', alignItems: 'center', padding: '5px' }} onClick={val.funcion}>
        <span style={{ fontSize: '15px', color: 'white' }}>Iniciar sesion</span>
      </button>
    </div>
  );
};

const Input = (val) => {
  return (
    <input placeholder={val.place} style={{ /* Add any specific styles for your input */ }} />
  );
};

export { Elementos, Btn, Input };
