import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

class Encriptacion extends Component {
  constructor() {
    super();
    this.state = {
      plaintext: '',
      shift: 0,
      ciphertext: '',
    };
  }

  encryptCesar = () => {
    const { plaintext, shift } = this.state;
    const shiftedText = plaintext
      .split('')
      .map((char) => {
        if (char.match(/[a-z]/i)) {
          const charCode = char.charCodeAt(0);
          let shiftAmount = shift % 26;
          if (char.match(/[a-z]/ && charCode + shiftAmount > 'z'.charCodeAt(0))) {
            shiftAmount -= 26;
          } else if (char.match(/[A-Z]/ && charCode + shiftAmount > 'Z'.charCodeAt(0))) {
            shiftAmount -= 26;
          }
          return String.fromCharCode(charCode + shiftAmount);
        }
        return char;
      })
      .join('');
    this.setState({ ciphertext: shiftedText });
  };

  handlePlaintextChange = (event) => {
    this.setState({ plaintext: event.target.value });
  };

  handleShiftChange = (event) => {
    this.setState({ shift: parseInt(event.target.value, 10) });
  };

  render() {
    return (
      <div className="container mt-5">
        <h2>Cifrado César</h2>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Texto a cifrar"
            value={this.state.plaintext}
            onChange={this.handlePlaintextChange}
          />
        </div>
        <div className="mb-3">
          <input
            type="number"
            className="form-control"
            placeholder="Desplazamiento"
            value={this.state.shift}
            onChange={this.handleShiftChange}
          />
        </div>
        <button className="btn btn-primary" onClick={this.encryptCesar}>
          Cifrar
        </button>
        <p className="mt-3">Cifrado: {this.state.ciphertext}</p>
      </div>
    );
  }
}

export default Encriptacion;
