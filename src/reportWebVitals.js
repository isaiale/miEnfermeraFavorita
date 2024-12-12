const reportWebVitals = (onPerfEntry) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry); // Cumulative Layout Shift
      getFID(onPerfEntry); // First Input Delay
      getFCP(onPerfEntry); // First Contentful Paint
      getLCP(onPerfEntry); // Largest Contentful Paint
      getTTFB(onPerfEntry); // Time to First Byte
    });
  }
};

const reportWebVitalsToAnalytics = (metric) => {
  console.log(metric); // Aquí se muestra la métrica en la consola
  // Si deseas agregar más detalles o personalizar la salida, puedes hacer algo como:
  console.log(`${metric.name}: ${metric.value} ${metric.id}`);
};

reportWebVitals(reportWebVitalsToAnalytics);

export default reportWebVitals;
