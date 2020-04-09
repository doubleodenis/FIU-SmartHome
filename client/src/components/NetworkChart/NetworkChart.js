import React from 'react';
import { Line, Bar } from 'react-chartjs-2';
import moment from 'moment'; 
/**
 * @param  {} props.data An array of objects containing data?
 */
const NetworkChart = (props) => {
  let minTime = null;
  if(props.time) {
	minTime = moment(Date.now()).subtract(props.time, 'minute');
  }
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
            max: 100000,
          }
        },
	{
	  type: 'linear',
	  display: false,
	  position: 'left',
	  id: 'y-axis-2',
	  ticks: {
	    min: 0,
	    max: 100000
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

  function createLabels() {
	if(props.time) {
		let labels = [], i = props.time, time = moment(Date.now());
		while(i > 0) {
			labels.push(time.subtract(i, 'minute').format('h:mm a'));
			i -= 10; //step size
		}
		console.log(labels);
		return labels;
	}
	else {
		return null;
	}
  }

  const data = {
    datasets: [{
      type: 'line',
      label: 'Received Bytes',
      //labels: createLabels(),
      data: receivedData,
      backgroundColor: '#4a8af0',
      borderColor: '#4a8af0',
      hoverBackgroundColor: '#4a8af0',
      hoverBorderColor: '#4a8af0',
      yAxisID: 'y-axis-1',
      spanGaps: true
    }, {
      type: 'line',
      label: 'Sent Bytes',
      data: sentData,
      backgroundColor: '#2948cf',
      borderColor: '#2948cf',
      hoverBackgroundColor: '#2948cf',
      hoverBorderColor: '#2948cf',
      yAxisID: 'y-axis-2',
      spanGaps: true
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
