import React, {useState, useEffect} from "react";
import PageContainer from "../components/PageContainer/PageContainer";
import LineChart from "../components/EnergyChart/EnergyChart";
import EnergyService from "../services/energyService";
import NetworkService from "../services/networkService";
import OccupancyChart from "../components/OccupancyChart/OccupancyChart";
import NetworkChart from "../components/NetworkChart/NetworkChart";
import CustomDropdown from "../components/CustomDropdown/CustomDropdown";
import { Header, Icon } from "semantic-ui-react";

const Home = (props) => {
   const [selectedDevice, setDevice] = useState(null); //state from props
    const [energy, setEnergy] = useState([]); //Energy chart
    const [network, setNetwork] = useState([]); //Network chart
    const [wemos, setWemos] = useState([]); //wemo list
    const [wemo, setWemo] = useState(null); 
    const [time, setTime] = useState(30); //time dropdown value
    //Used as componentDidMount
    useEffect(() => {
        
	    setDevice(props.device.ip_address);
        EnergyService.getWemos().then(res => {
            console.log("Wemos: ", res);
		    const result = res.map(row => {
                return { text: row.device_name + ' | ' + row.device_Serial_number, 
                    value: row.device_Serial_number }
			});
		    setWemos(result);
        })
        .catch(err => console.log(err));

    }, [props.device]);

    //When wemo and time change
    useEffect(() => {
        updateCharts(wemo, time);
    }, [wemo, time]);

    let times = [
        { text: '30m', value: 30 },
        { text: '1h', value: 60},
	{ text: '3h', value: 180},
        { text: '6h', value: 360},
        { text: '12h', value: 720}
    ]

    function handleWemo(event, {value}) {
        setWemo(value);
	updateCharts(wemo, time);
    }
    
    function handleTime(event, {value}) {
        setTime(value);
        updateCharts(wemo, time);
    }

    function updateCharts(wemo, time) {
       console.log(wemo, time);
	 if(!wemo || !time) {
            console.log("Missing Wemo or Time value");
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
            console.log(res);
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
            <LineChart data={energy}></LineChart>
            <NetworkChart data={network}></NetworkChart>
            <OccupancyChart></OccupancyChart>
        </PageContainer>
        ) : (
        <PageContainer>
            <Header>Please choose a device on the left. Or refresh if none are showing up.</Header>
        </PageContainer>
    )
}

export default Home;
