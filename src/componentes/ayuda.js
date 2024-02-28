import '../css/Slider.css';

const ProductCard = () => {
  return (
    <div className='fadeInColor'>
      <div style={{ display: 'flex', margin: '0 auto',maxWidth: '1000px' }}>
        <div style={{margin:'25px', marginRight:'10em', width: '100%'}}>
          <img
          src="https://www.apple.com/v/airpods-max/f/images/overview/hero__gnfk5g59t0qe_large.png"
          alt="AirPods Max"
          style={{
            width: '100%',
            height: '450px',  
                     
          }}
        />
        </div>
        
        <div style={{margin: 'auto'}}>
          <h1 style={{ fontSize: '4em', color: '#333', marginBottom: '0.5em', width: '400px' }}>
            Apple AirPods Max
          </h1>
          <p style={{ fontSize: '2em', color: '#666', marginTop: '1px',width: '400px' }}>
            Wireless Over-Ear Headphones
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
