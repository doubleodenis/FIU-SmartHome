import React, {useState, useEffect, useRef} from "react";
import PageContainer from "../components/PageContainer/PageContainer";
import LineChart from "../components/EnergyChart/EnergyChart";
import EnergyService from "../services/energyService";
import NetworkService from "../services/networkService";
import OccupancyService from "../services/occupancyService"
import OccupancyChart from "../components/OccupancyChart/OccupancyChart";
import NetworkChart from "../components/NetworkChart/NetworkChart";
import CustomDropdown from "../components/CustomDropdown/CustomDropdown";
import { Header, Icon } from "semantic-ui-react";

//creating a useInterval hook (setInterval does not use updated state)
   function useInterval(callback, delay) {
	const savedCallback = useRef();
	
	//remember latest callback
	useEffect(() => {
	   savedCallback.current = callback;
   	}, [callback]);

	//setup the interval
	useEffect(() => {
	   function tick() {
		savedCallback.current();
	   }

	   if(delay != null) {
		let id = setInterval(tick, delay);
		return () => clearInterval(id);
	   }
	}, [delay]);
    }

const Home = (props) => {

    const [selectedDevice, setDevice] = useState(null); //state from props
    const [energy, setEnergy] = useState([]); //Energy chart
    const [network, setNetwork] = useState([]); //Network chart
    const [wemos, setWemos] = useState([]); //wemo list
    const [wemo, setWemo] = useState(null);
    const [occupancy, setOccupancy] = useState([])
    const [time, setTime] = useState(30); //time dropdown value
    
    //start timer for refreshing charts
    useInterval(updateCharts, 60000);

     //Used as componentDidMount
    useEffect(() => {
	console.log(props.device);
        if(props.device.ip_address) {

           setDevice(props.device.ip_address);
           EnergyService.getWemos().then(res => {
	       const result = res.map(row => {
                   return { text: row.device_name + ' | ' + row.device_Serial_number,
                       value: row.device_Serial_number }
		   });
		       setWemos(result);
		       //handleWemo(null, result[0]);
           })
           .catch(err => console.log(err));
	}

    }, [props.device]);
    
    useEffect(() => {
	//update when wemo or time changes
	updateCharts();
        console.log(wemo, time);
    }, [wemo, time]);


    let times = [
        { text: '30m', value: 30 },
        { text: '1h', value: 60},
	{ text: '3h', value: 180},
        { text: '6h', value: 360}
    ]

    function handleWemo(event, {value}) {
	//if selecting first wemo, init time frame
	if(wemo == null) setTime(30);

        setWemo(value);
	console.log(value);
    }

    function handleTime(event, {value}) {
        setTime(value);
    }

    function updateCharts() {
       console.log('refreshing charts...');
	if(!wemo || !time) {
            console.log("Missing Wemo or Time value", wemo, time);
            return;
        }
	
        EnergyService.getEnergy(wemo, time).then(res => {
            console.log(res);
	    if(res) {
            	const data = res.map(e => {
                     return {
                       x: new Date(e.date),
                       y: e.energy
                   }
               });
               setEnergy(data);
	   }
        });

        NetworkService.getNetworkTraffic(selectedDevice, time).then(res => {
            if(res) {
     	    /* const data = res.map(n => {
                const obj = {
                     x: new Date(n.Date),
                     y: 'n.bandwidth'
                  }
                  return obj;
               });*/
               setNetwork(res);
	    }
        })

        OccupancyService.getOccupancy(1, time).then(res => {
          console.log(res)
          if (res) {
            const data = res.map(o => {
              return {
                x: new Date(o.date),
                y: o.occupancy
              }
            });
            setOccupancy(data);
          }
        });
      }


    const dropdownStyle = {
        width: 250,
        height: 100,
        display: 'inline-block',
        marginRight: 15
    }

    return selectedDevice ? (
        <PageContainer style={{ }}>
            <Header as="h2">{selectedDevice}</Header>
            <div>
                <div style={dropdownStyle}>
                    <CustomDropdown label="Wemo" placeholder="Wemo" items={wemos} onClick={handleWemo}
                    labelIcon={<Icon name="linkify" style={{margin: "0px 3px"}}/>}/>
                </div>
                <div style={dropdownStyle}>
                    <CustomDropdown label="Time" placeholder="Time" items={times} onClick={handleTime}/>
                </div>
            </div>
            <LineChart data={energy} time={time}></LineChart>
            <NetworkChart data={network} time={time}></NetworkChart>
            <OccupancyChart data={occupancy} time ={time}></OccupancyChart>
        </PageContainer>
        ) : (
        <PageContainer>
            <Header>Please choose a device on the left. Or refresh if none are showing up.</Header>
        </PageContainer>
    )
}

export default Home;
