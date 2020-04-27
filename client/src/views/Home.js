import React, { useState, useEffect, useRef } from "react";
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

        if (delay != null) {
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
    const [time, setTime] = useState(null); //time dropdown value

    //start timer for refreshing charts
    useInterval(updateCharts, 60000);

    //Called when props.device changes to an actual value
    useEffect(() => {

        if (props.device.ip_address) {

            setDevice(props.device.ip_address);
            EnergyService.getWemos().then(res => {
                const result = res.map(row => {
                    return {
                        text: row.device_name + ' | ' + row.device_Serial_number,
                        value: row.device_Serial_number
                    }
                });
                setWemos(result);

            })
            .catch(err => console.log(err));
        }

    }, [props.device]);

    //immediately update charts when wemo or time changes
    useEffect(() => {
        updateCharts();
    }, [wemo, time]);

    /**
     * Handler for wemo dropdown.
     * @param {*} event change event
     * @param {*} value The value of the selected dropdown item
     */
    function handleWemo(event, { value }) {

        //if selecting first wemo, init time frame
        if (wemo == null) setTime(30);

        setWemo(value);
        console.log(value);

    }

    /**
     * Handler for time dropdown.
     * @param {*} event change event
     * @param {*} value The value of the selected dropdown item
     */
    function handleTime(event, { value }) {
        setTime(value);
    }

    /**
     * Calls services to get data from the API for Energy, Network, and Occupancy.
     */
    function updateCharts() {
        
        if (!wemo || !time) {
            console.log("Missing Wemo or Time value", wemo, time);
            return;
        }
        let promises = [];
        //Energy service call
        promises.push(EnergyService.getEnergy(wemo, time));
        //Network service call
        promises.push(NetworkService.getNetworkTraffic(selectedDevice, time));
        //Occupancy service call - hardcoded to user 1, TODO: update this when user system is implemented
        promises.push(OccupancyService.getOccupancy(1, time));

        Promise.all(promises).then(res => {
            //energy response
            if(res[0]) setEnergy(res[0]);

            //network response
            if(res[1]) setNetwork(res[1]);

            //occupancy response
            if(res[2]) setOccupancy(res[2]);
        })
        .catch(err => {
            console.log(err);
        })

    }
    
    //time dropdown items
    let times = [
        { text: '30m', value: 30 },
        { text: '1h', value: 60 },
        { text: '3h', value: 180 },
        { text: '6h', value: 360 }
    ]

    const dropdownStyle = {
        width: 250,
        height: 100,
        display: 'inline-block',
        marginRight: 15
    }

    return selectedDevice ? (
        <PageContainer style={{}}>
            <Header as="h2">{selectedDevice}</Header>
            <div>
                <div style={dropdownStyle}>
                    <CustomDropdown label="Wemo" placeholder="Wemo" items={wemos} onClick={handleWemo}
                        labelIcon={<Icon name="linkify" style={{ margin: "0px 3px" }} />} />
                </div>
                <div style={dropdownStyle}>
                    <CustomDropdown label="Time" placeholder="Time" items={times} onClick={handleTime} />
                </div>
            </div>
            <LineChart data={energy} time={time}></LineChart>
            <NetworkChart data={network} time={time}></NetworkChart>
            <OccupancyChart data={occupancy} time={time} style={{ paddingLeft: 10 }}></OccupancyChart>
        </PageContainer>
    ) : (
            <PageContainer>
                <Header>Please choose a device on the left. Or refresh if none are showing up.</Header>
            </PageContainer>
        )
}

export default Home;
