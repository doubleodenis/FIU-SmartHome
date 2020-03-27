import React from 'react';
import { Line, Bar } from 'react-chartjs-2';
 
/**
 * @param  {} props.data An array of objects containing data?
 */
const OccupancyChart = (props) => {

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
            max: 1,
          }
        }
      ]
    }
  };

  const data = {
    datasets: [{
      type: 'line',
      label: 'Occupancy',
      data: [{ t: new Date(), y: 0 }, { t: 100000, y: 1 }],
      // fill: false,
      backgroundColor: '#f0c64a',
      borderColor: '#f0c64a',
      hoverBackgroundColor: '#f0c64a',
      hoverBorderColor: '#f0c64a',
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

export default OccupancyChart;