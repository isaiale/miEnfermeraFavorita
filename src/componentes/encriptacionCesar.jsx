import React, { useState } from 'react';

function CifradoCesar() {
  const [text, setText] = useState('');
  const [shift, setShift] = useState(4);
  const [result, setResult] = useState('');
  const [decryptedText, setDecryptedText] = useState('');

  const encrypt = () => {
    const encryptedText = text
      .split('')
      .map(char => {
        if (char.match(/[a-zA-ZñÑ]/)) {
          const isUpperCase = char === char.toUpperCase();
          const alphabet = isUpperCase ? 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ' : 'abcdefghijklmnñopqrstuvwxyz';
          const charIndex = alphabet.indexOf(char);
          const shiftedIndex = (charIndex + shift) % 28; // Ajustar al tamaño del alfabeto con la 'ñ'
          return isUpperCase ? alphabet[shiftedIndex] : alphabet[shiftedIndex].toLowerCase();
        }
        return char;
      })
      .join('');
    setResult(encryptedText);
  };

  const decrypt = () => {
    const decryptedText = result
      .split('')
      .map(char => {
        if (char.match(/[a-zA-ZñÑ]/)) {
          const isUpperCase = char === char.toUpperCase();
          const alphabet = isUpperCase ? 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ' : 'abcdefghijklmnñopqrstuvwxyz';
          const charIndex = alphabet.indexOf(char);
          const shiftedIndex = (charIndex - shift + 28) % 28; // Ajustar al tamaño del alfabeto con la 'ñ'
          return isUpperCase ? alphabet[shiftedIndex] : alphabet[shiftedIndex].toLowerCase();
        }
        return char;
      })
      .join('');
    setDecryptedText(decryptedText);
  };

  return (
    <div className="container border mt-5">
      <h1 className="mt-4 text-center">Cifrado César</h1>
      <div className="form-group">
        <label htmlFor="text" className='fs-4'>Texto a cifrar:</label>
        <input
          type="text"
          id="text"
          className="form-control"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="shift" className='fs-4'>Desplazamiento:</label>
        <input
          type="number"
          id="shift"
          className="form-control"
          value={shift}
          onChange={(e) => setShift(parseInt(e.target.value, 10))}
        />
      </div>
      <button className="btn btn-primary m-2" onClick={encrypt}>Cifrar</button>
      <button className="btn btn-success m-2" onClick={decrypt}>Desencriptar</button>

      <div className="mt-4">
        <h3>Texto cifrado:</h3>
        <p>{result}</p>
      </div>
      <div className="mt-4">
        <h3>Texto desencriptado:</h3>
        <p>{decryptedText}</p>
      </div>
    </div>
  );
}

export default CifradoCesar;
