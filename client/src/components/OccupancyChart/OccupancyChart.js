import React from 'react';
import { VictoryAxis, VictoryTheme, VictoryLabel} from "victory";

/**
 * @param  {} props.data An array of objects containing data?
 */
const OccupancyChart = (props) => {    
    
    return (
        <svg width={500} height={300} style={{marginLeft: 20}}>
            <VictoryAxis dependentAxis
                tickLabelComponent={<VictoryLabel dy={-10} dx={15}/>}
                width={500}
                height={300}
                domain={[0, 1]}
                theme={VictoryTheme.material}
                standalone={false}
                tickValues={["Occupied"]}

            />
            <VictoryAxis 
                width={500}
                height={300}
                domain={[0, Date.now()]}
                theme={VictoryTheme.material}
                standalone={false}
                label="Time"
                scale={{ x: "time" }}
                animate={{
                    duration: 2000,
                    easing: "bounce"
                  }}
            />
        </svg>
    )
}

export default OccupancyChart;