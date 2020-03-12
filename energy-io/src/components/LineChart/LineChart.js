import React from 'react';
import { VictoryChart, VictoryLine, VictoryTooltip, VictoryScatter, VictoryVoronoiContainer, VictoryCursorContainer} from "victory";
/**
 * @param  {} props.data An array of objects containing data?
 */
const LineChart = (props) => {

    // let data = props.data;
    let data = [
        { x: 1, y: 11 },
        { x: 2, y: 3 },
        { x: 3, y: 7 },
        { x: 4, y: 4 },
        { x: 5, y: 6 }
        ];
    // data = data.map(datum => {
    //     datum.label = `x: ${datum.x}, y: ${datum.y}\nTooltip`
    //     return datum;
    // });
    
    return (
        <VictoryChart 
            height={500}
            width={500}    
            containerComponent={ <VictoryVoronoiContainer
            responsive={false}
                // cursorLabel={({ datum }) => {
                //     return `${Math.round(datum.x, 2)}, ${Math.round(datum.y, 2)}`
                // }}
                mouseFollowTooltips
                voronoiDimension="x"
                voronoiBlacklist={["scatter"]}
                labels={({ datum }) => `x: ${datum.x}, y: ${datum.y}`}
                labelComponent={<VictoryTooltip cornerRadius={0} flyoutStyle={{fill: "white"}}/>}
            />}
            scale={{x: 'time', y: 'linear'}}

          >
            <VictoryScatter name="scatter" data={data} 
                style={{
                    data: { fill: "green", strokeWidth: ({ active }) => active ? 2 : 1}
                }}
                size={2}
                />
                
            <VictoryLine
            // theme={VictoryTheme.material}
                style={{
                    data: { stroke: ({ active }) => active ? "green" : "lightgreen", strokeWidth: ({ active }) => active ? 2 : 1}
                }}
                padding={{ top: 20, bottom: 60 }}
                domain={{x: [0, 10], y: [0, 50]}}
                data={data}
                events={[{
                    target: "parent",
                    eventHandlers: {
                      onMouseOver: () => {
                        return [
                          {
                            target: "data",
                            eventKey: "all",
                            mutation: ({ style }) => {
                            //   return style.stroke === "green"
                            //     ? null 
                            //     : { style: { stroke: "green", strokeWidth: 2 } };
                                // return style.stroke === "green" ?  { style: { stroke: "lightgreen", strokeWidth: 1 } } 
                                // : { style: { stroke: "green", strokeWidth: 2 } };
                            }
                          }
                        ];
                      }
                    }
                  }]}
            />
        </VictoryChart>
    )
}

export default LineChart;