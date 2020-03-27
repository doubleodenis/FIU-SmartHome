import React from 'react';
import { Line, Bar } from 'react-chartjs-2';
 
/**
 * @param  {} props.data An array of objects containing data?
 */
const NetworkChart = (props) => {

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    aspectRatio: '2',
    tooltips: {
      mode: 'label'
    },
    elements: {
      line: {
        fill: false
      }
    },
    scales: {
      xAxes: [
        {
          type: 'time',
          distribution: 'series',
          time: {
            displayFormats: {
                minute: 'h:mm a'
            }
          },
          ticks: {
            source: 'auto'
          }
        }
      ],
      yAxes: [
        {
          type: 'linear',
          display: true,
          position: 'left',
          id: 'y-axis-1',
          ticks: {
            min: 0,
            max: 50,
          }
        }
      ]
    }
  };

  const data = {
    datasets: [{
      type: 'line',
      label: 'Network (MB/s)?',
      data: [{ t: new Date(), y: 30 }, { t: 100000, y: 32 }],
      // fill: false,
      backgroundColor: '#4a8af0',
      borderColor: '#4a8af0',
      hoverBackgroundColor: '#4a8af0',
      hoverBorderColor: '#4a8af0',
      yAxisID: 'y-axis-1'
    }]
  };

  return(
    <div style={{ height: 500, width: 900}}>
       <Bar
      data={data} 
      options={options} />

    </div>
    
  )
}

export default NetworkChart;