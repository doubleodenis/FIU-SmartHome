import React, { useState, useEffect } from "react";
import Router from "./Router"
import { Sidebar } from "semantic-ui-react"
import CustomSidebar from "./components/Sidebar/Sidebar"
import NetworkService from "./services/networkService"

// import API from "./utils/API";

function App() {
    const [devices, setDevices] = useState([]);
    const [device, setDevice] = useState(null);
    

    //Called as OnComponentDidMount
    useEffect(function() {
        // NetworkService.getNetworkDevices()
        // .then(res => setDevices(res))
        // .catch(err => console.log(err));
        setDevices([
            '10.3.141.120',
            '10.3.141.119'
        ])
    }, [])

    function selectDevice(device) {
        console.log(device);
        setDevice(device);
    }
    return (
    <div>
        <CustomSidebar devices={devices} onSelect={selectDevice} selected={device}/>
        <Sidebar.Pusher>
            <Router device={device} />   
        </Sidebar.Pusher>
    </div>
    );
}

export default App;