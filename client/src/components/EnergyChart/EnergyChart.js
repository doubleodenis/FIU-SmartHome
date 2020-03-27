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
      label: 'Energy (kw) ?',
      data: [{ t: new Date(), y: 30 }, { t: 100000, y: 32 }],
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
    // return (
    //   <Line   
    //   // ref={props.ref}
    //   options={options}
    //   data={data} 
    //   width={750}
    //   height={400}
      
    //   />
    // )
}

export default EnergyChart;