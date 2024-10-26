import React from 'react'
import Plot from 'react-plotly.js';
import '../../App.css';

function dataChart({data, color, title, time}) {
  return (
    <Plot className='w-1/3 h-full'
    data={[
      {
        x: time,
        y: data.y,
        type: 'scatter',
        mode: 'lines+markers',
        marker: {color: color},
        line: { shape: 'spline' },
        name : {title}
      }
    ]}
    layout={ {height: 250,title: title,
        xaxis: { title: 'Time (seconds)' },
        yaxis: { title: title },
        margin: { l: 50, r: 0, t: 50, b: 50 }, 
    } }
    config={{
        displayModeBar: false, 
        responsive: true,
      }}
  />
  )
}
export default dataChart;