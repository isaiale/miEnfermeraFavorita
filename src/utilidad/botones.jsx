import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const BtnColorRosa = ({ nombre, onClick }) => {
  return (
    <div>
      <button className="btn w-100" style={{ backgroundColor: '#FF4081', color: 'white', borderRadius: '0px' }} onClick={onClick}>
        {nombre}
      </button>
    </div>
  );
};

const BtnRosaIcono = ({ nombre, onClick, icon }) => {
  return (
    <div>
      <button className="btn w-100" style={{ backgroundColor: '#FF4081', color: 'white', borderRadius: '0px' }} onClick={onClick}>
        {icon && <FontAwesomeIcon icon={icon} />}&nbsp;
        { nombre}
      </button>
    </div>
  );
};

export { BtnColorRosa, BtnRosaIcono };
