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
            max: 15000,
          }
        },
	{
	  type: 'linear',
	  display: false,
	  position: 'left',
	  id: 'y-axis-2',
	  ticks: {
	    min: 0,
	    max: 5000,
	  }
	}
      ]
    }
  };

  let sentData = [], receivedData = [];
  if(props.data) {
     sentData = props.data.map(data => {
	return { y: data.sent_bytes, t: new Date(data.time) };
	});

     receivedData = props.data.map(data => {
	return { y: data.received_bytes, t: new Date(data.time) };
	});
  }

  const data = {
    datasets: [{
      type: 'line',
      label: 'Received Bytes',
      data: receivedData,
      backgroundColor: '#4a8af0',
      borderColor: '#4a8af0',
      hoverBackgroundColor: '#4a8af0',
      hoverBorderColor: '#4a8af0',
      yAxisID: 'y-axis-1'
    }, {
      type: 'line',
      label: 'Sent Bytes',
      data: sentData,
      backgroundColor: '#2948cf',
      borderColor: '#2948cf',
      hoverBackgroundColor: '#2948cf',
      hoverBorderColor: '#2948cf',
      yAxisID: 'y-axis-2'
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
