import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';

function CoordinateChart({ coordinates, time }) {
  const [data, setData] = useState({
    x: [],
    yLat: [],
    yLon: []
  });

  useEffect(() => {
    // Append new coordinates to the data arrays
    setData((prevData) => ({
      x: [...prevData.x, time],
      yLat: [...prevData.yLat, coordinates[0]],
      yLon: [...prevData.yLon, coordinates[1]]
    }));
  }, [coordinates, time]);

  return (
    <Plot
      data={[
        {
          x: data.x,
          y: data.yLat,
          type: 'scatter',
          mode: 'lines+markers',
          name: 'latitude',
          line: { color: 'purple' },
        },
        {
          x: data.x,
          y: data.yLon,
          type: 'scatter',
          mode: 'lines+markers',
          name: 'longitude',
          line: { color: 'green' },
        }
      ]}
      layout={{height : 300, title: 'Latitude, Longitude',
        xaxis: { title: 'Time (seconds)' },
        yaxis: { title: 'Coordinates' },
        margin: { l: 50, r: 0, t: 50, b: 50 }, 
       }}
    />
  );
}

export default CoordinateChart;
