// import React, { useEffect, useRef } from 'react';

// function Mapa1Map() {
//   const mapContainerRef = useRef(null);  // Usar ref para manejar la inicialización del mapa

//   useEffect(() => {
//     // Comprobar si el script ya se ha cargado para evitar duplicados
//     if (!document.querySelector('script[src="https://1map.com/js/script-for-user.js?embed_id=1137367"]')) {
//       const script = document.createElement('script');
//       script.src = 'https://1map.com/js/script-for-user.js?embed_id=1137367';
//       script.async = true;

//       script.onload = () => {
//         if (mapContainerRef.current) {  // Comprobar si el contenedor del mapa está disponible
//           const setting = {
//             query: "Calle San Luis Potosí, Tahuizan, ciudad Huejutla de Reye",
//             width: "100%", // Ajustado para ser responsive
//             height: 545,
//             satellite: false,
//             zoom: 19,
//             placeId: "EjlTYW4gTHVpcywgVGFodWl6YW4sIDQzMDAwIEh1ZWp1dGxhIGRlIFJleWVzLCBIZ28uLCBNZXhpY28iLiosChQKEgnDF_Uj6ibXhREisP8B61VBaxIUChIJF2EkHOom14URVbNnGHjM5QM",
//             cid: "0x6b4155eb01ffb022",
//             coords: [21.1443028, -98.4239882],
//             cityUrl: "/el-salvador/san-luis-287800",
//             cityAnchorText: "Mapa de San Luis, La Paz Department, El Salvador",
//             lang: "es",
//             queryString: "Calle San Luis Potosí, Tahuizan, ciudad Huejutla de Reye",
//             centerCoord: [21.1443028, -98.4239882],
//             id: "map-9cd199b9cc5410cd3b1ad21cab2e54d3",
//             embed_id: "1137367"
//           };
//           window.OneMap.initMap(setting);
//         }
//       };

//       document.body.appendChild(script);

//       return () => {
//         document.body.removeChild(script);
//       };
//     }
//   }, []);

//   return (
//     <div className="container-fluid">
//       <div id="wrapper-9cd199b9cc5410cd3b1ad21cab2e54d3" className="row">
//         <div ref={mapContainerRef} id="map-9cd199b9cc5410cd3b1ad21cab2e54d3" className="col-12" style={{height: '545px'}}></div>
//       </div>
//       <a href="https://1map.com/es/map-embed">1 Map</a>
//     </div>
//   );
// }

// export default Mapa1Map;
