import React from 'react';
import { Bar } from 'react-chartjs-2';

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
            max: 200,
          }
        },
        {
          type: 'linear',
          display: false,
          position: 'left',
          id: 'y-axis-2',
          ticks: {
            min: 0,
            max: 200
          }
        }
      ]
    }
  };

  let sentData = [], receivedData = [];
  if (props.data) {
    
    //mapping the dataset
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
      label: 'Received (MB)',
      data: receivedData,
      backgroundColor: '#4a8af0',
      borderColor: '#4a8af0',
      hoverBackgroundColor: '#4a8af0',
      hoverBorderColor: '#4a8af0',
      yAxisID: 'y-axis-1',
      spanGaps: true
    }, {
      type: 'line',
      label: 'Sent (MB)',
      data: sentData,
      backgroundColor: '#2948cf',
      borderColor: '#2948cf',
      hoverBackgroundColor: '#2948cf',
      hoverBorderColor: '#2948cf',
      yAxisID: 'y-axis-2',
      spanGaps: true
    }]
  };

  return (
    <div style={{ height: 500, width: 900 }}>

      <Bar
        data={data}
        options={options} />

    </div>

  )
}

export default NetworkChart;
