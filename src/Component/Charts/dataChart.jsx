import React from 'react'
import Plot from 'react-plotly.js';

function dataChart({data, color, title, time}) {
  return (
    <Plot
    data={[
      {
        x: time,
        y: data.y,
        type: 'scatter',
        mode: 'lines+markers',
        marker: {color: color},
        name : {title}
      }
    ]}
    layout={ {width: 900, height:450, title: title,
        xaxis: { title: 'Time (seconds)' },
        yaxis: { title: title }
    } }
    className='w-auto'
  />
  )
}
export default dataChart;