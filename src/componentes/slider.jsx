import React from "react";
import Carousel from 'react-bootstrap/Carousel';
import img1 from '../img/hand-drawn-style-healthcare-center1664541219.jpg';
import img2 from '../img/upload.png';

const Slider = () => {

    const sliders = [
        {
            id: 1,
            img: img2,
            descripcion: "Descripción 1"
        },
        {
            id: 2,
            img: img1,
            descripcion: "Descripción 2"
        },
        {
            id: 3,
            img: img2,
            descripcion: "Descripción 3"
        }
    ];

    return (
        <Carousel className="carousel slider" interval={3000}>
            {sliders.map((slide) => (
                <Carousel.Item key={slide.id}>
                    <img className="d-block img-fluid w-100" src={slide.img} alt={`Slide ${slide.id}`} />
                    <Carousel.Caption className="carousel-caption">
                        <p className="text-dark fw-bold mb-1">{slide.descripcion}</p>
                    </Carousel.Caption>
                </Carousel.Item>
            ))}
        </Carousel>
    );
};

export default Slider;
