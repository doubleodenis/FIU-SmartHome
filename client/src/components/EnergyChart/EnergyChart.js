import React from 'react';
import { Line, Bar } from 'react-chartjs-2';
 
/**
 * @param  {} props.data An array of objects containing data?
 */
const EnergyChart = (props) => {

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    aspectRatio: '2',
    tooltips: {
      mode: 'label'
    },
    elements: {
      line: {
        fill: false,
	tension: 0,
	stepped: false,
	borderDash: []
      }
    },
    scales: {
      xAxes: [
        {
          type: 'time',
          distribution: 'linear',
          time: {
	    unit: 'minute',
	    stepSize: 5,
            displayFormats: {
                minute: 'h:mm a'
            }
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
            max: 5000,
	    stepSize: 500
          }
        }
      ]
    }
  };
  let dataset = [];
  if(props.data) {
	dataset = props.data;
  }
  const data = {
    datasets: [{
      type: 'line',
      label: 'Energy (W)',
      data: dataset,
      // fill: false,
      backgroundColor: '#13bd19',
      borderColor: '#13bd19',
      hoverBackgroundColor: '#13bd19',
      hoverBorderColor: '#13bd19',
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

export default EnergyChart;
