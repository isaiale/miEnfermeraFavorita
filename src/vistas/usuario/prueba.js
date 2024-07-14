import React from "react";
import '../../css/productos.css';

const ProductosE = () => {

	return (
		<div>
			<section class="container-related-products">
				<h2>Productos Relacionados</h2>
				<div class="card-list-products">
					<div class="card">
						<div className="discount-icon"><i class="fa fa-ticket"> </i> 4 %</div> {/* Icono de descuento */}
						<div class="card-img">
							<img class='imagen'
								src="https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1025&q=80"
								alt="producto-1"
							/>
						</div>
						<div class="info-card">
							<div class="text-product">
								<h3>Nike - Roshe Run</h3>
								<p class="category"><i class="fa fa-solid fa-tag"></i>Footwear, Sneakers</p>
							</div>
							<div class="price">$85.00</div>
						</div>
					</div>
					<div class="card">
						<div class="card-img">
							<img className="imagen"
								src="https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1131&q=80"
								alt="producto-2"
							/>
						</div>
						<div class="info-card">
							<div class="text-product">
								<h3>Common Projects Achilles</h3>
								<p class="category">Footwear, Sneakers</p>
							</div>
							<div class="price">$255.00</div>
						</div>
					</div>
					<div class="card">
						<div class="card-img">
							<img className="imagen"
								src="https://images.unsplash.com/flagged/photo-1556637640-2c80d3201be8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
								alt="producto-3"
							/>
						</div>
						<div class="info-card">
							<div class="text-product">
								<h3>Adidas - Boston Super OG</h3>
								<p class="category">Footwear, Sneakers</p>
							</div>
							<div class="price">$105.00</div>
						</div>
					</div>
					<div class="card">
						<div className="discount-icon">
							4%
						</div> {/* Icono de descuento */}
						<div class="card-img">
							<img className="imagen"
								src="https://images.unsplash.com/photo-1617606002779-51d866bdd1d1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
								alt="producto-4"
							/>
						</div>
						<div class="info-card">
							<div class="text-product">
								<h3>Common Projects Achilles</h3>
								<p class="category">Footwear, Sneakers</p>
							</div>
							<div class="price">$250.00</div>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
};

export default ProductosE;
