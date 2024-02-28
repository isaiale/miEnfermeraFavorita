import React, { useState } from "react";
import imgProduct from '../../img/enfermera-removebg-preview.png';
import imgProduct1 from '../../img/enfermera-removebg-preview.png';
import imgProduct2 from '../../img/imagenProductoAtuendo.jpg';
import imgProduct3 from '../../img/imagenProductoAtuendoss.jpg';
import "../../css/ProductosE.css";

const ProductosE = () => {
  const [selectedImage, setSelectedImage] = useState(imgProduct); // Estado para controlar la imagen seleccionada
  const [count, setCount] = useState(1); // Estado para controlar la cantidad de productos seleccionados

  // Función para manejar el clic en una miniatura
  const handleThumbnailClick = (image) => {
    setSelectedImage(image);
  };

  const [selectedTalla, setSelectedTalla] = useState("S");

  // Función para manejar el incremento o decremento de la cantidad de productos
  const handleCountChange = (action) => {
    if (action === "increment") {
      setCount(count + 1);
    } else if (action === "decrement" && count > 1) {
      setCount(count - 1);
    }
  };

  return (
    <div>
      <div className="product-container ">
        <div className="images-description-wrapper">
          <div className="thumbnails-container ">
            <img
              src={imgProduct}
              alt="Producto"
              onClick={() => handleThumbnailClick(imgProduct)}
            />
            <img
              src={imgProduct1}
              alt="Producto1"
              onClick={() => handleThumbnailClick(imgProduct1)}
            />
            <img
              src={imgProduct2}
              alt="Producto2"
              onClick={() => handleThumbnailClick(imgProduct2)}
            />
            <img
              src={imgProduct3}
              alt="Producto3"
              onClick={() => handleThumbnailClick(imgProduct3)}
            />
          </div>
          <div className="image-container border">
            <img src={selectedImage} alt="Imagen principal" />
          </div>
        </div>

        <div className="description-container">
          <h3 className="display-4">Filipina Luisa para Dama</h3>
          <p className="lead">
            Disfruta de cada momento de tu trabajo junto a nuestra filipina
            Luisa para dama. Contamos con un amplio surtido de estampados
            brillantes, coloridos y llamativos.
          </p>
          <h4 className="precio mb-3">$ 500.00</h4>
          <div>
            <h4 className="cantidad lead">Cantidad</h4>
            <div className="contenedor-cantidad mb-3">
              <button
                type="button"
                className="menos"
                onClick={() => handleCountChange("decrement")}
              >
                -
              </button>
              <input
                id="quantity"
                className=""
                value={count}
                min="1"
                type="text"
                name="quantity"
              />
              <button
                type="button"
                className="mas"
                onClick={() => handleCountChange("increment")}
              >
                +
              </button>
            </div>
          </div>
          <h4 className="cantidad lead">Tallas:</h4>
          <div className="talla-contenedor ">
            <button
              className={`talla-button ${selectedTalla === "S" ? "active" : ""
                }`}
              onClick={() => setSelectedTalla("S")}
            >
              S
            </button>
            <button
              className={`talla-button ${selectedTalla === "M" ? "active" : ""
                }`}
              onClick={() => setSelectedTalla("M")}
            >
              M
            </button>
            <button
              className={`talla-button ${selectedTalla === "L" ? "active" : ""
                }`}
              onClick={() => setSelectedTalla("L")}
            >
              L
            </button>
          </div>
          <div className="">
            <button className="agregar_carrito">Agregar al carrito</button>
          </div>
          <div>
            <button className="comprar">Comprar ahora</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductosE;
