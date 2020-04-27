import React, { useState, useEffect } from "react";
import Router from "./Router"
import { Sidebar } from "semantic-ui-react"
import CustomSidebar from "./components/Sidebar/Sidebar"
import NetworkService from "./services/networkService"

function App() {
    const [devices, setDevices] = useState([]);
    const [device, setDevice] = useState({});

    //Called as OnComponentDidMount
    useEffect(function () {
        getDevices();
    }, [])

    /**
     * Service call to get devices from API.
     */
    function getDevices() {
        NetworkService.getNetworkDevices()
            .then(res => {
                console.log("Network devices:", res);
                setDevices(res);
            })
            .catch(err => console.log(err));
    }

    /**
     * Device handler for selecting an IP.
     * @param {Object} device the current selected device
     */
    function selectDevice(device) {
        console.log(device);
        setDevice(device);
    }

    return (
        <div>
            <CustomSidebar devices={devices} onSelect={selectDevice} selected={device} onRefresh={getDevices} />
            <Sidebar.Pusher>
                <Router device={device} />
            </Sidebar.Pusher>
        </div>
    );
}

export default App;
