import React, {useState, useEffect} from "react";
import PageContainer from "../components/PageContainer/PageContainer";
import LineChart from "../components/LineChart/LineChart";
import EnergyService from "../services/energyService";
import OccupancyChart from "../components/OccupancyChart/OccupancyChart";
import NetworkChart from "../components/NetworkChart/NetworkChart";
import CustomDropdown from "../components/CustomDropdown/CustomDropdown";
import { Header, Icon } from "semantic-ui-react";

function getEnergy(setter) {
    EnergyService.getEnergy(120).then(res => {
            console.log(res);
            const data = res.map(e => { 
                const obj = {
                    x: new Date(e.Date),
                    y: e.Energy
                }
                return obj;
            });
            setter(data);
        });
}

const Home = (props) => {
    const [energy, setEnergy] = useState([]);
    const [wemos, setWemos] = useState([]);
    const [wemo, setWemo] = useState(null);

    //Used as componentDidMount
    useEffect(() => {
        // const interval = setInterval(function () {
        //     // getEnergy(setEnergy)
        // }, 5000);

        // setTimeout(function() {
        //     clearInterval(interval);
        // }, 15000)
        
    }, []);

     //This will happen continuously (I have no idea why)
     setTimeout(function() {
        // getEnergy(setEnergy);
    }, 1000 * 30);


    let times = [
        { text: '30m', value: '30' },
        { text: '1h', value: '60'},
        { text: '6h', value: '360'},
        { text: '12h', value: '720'}
    ]

    function handleWemo() {
        EnergyService.getWemos().then(res => {
            console.log("Device: ", res);
        })
        .catch(err => console.log(err));
    }

    function handleTime(time) {
        EnergyService.getEnergy(time.value).then(res => {
            console.log(res);
            const data = res.map(e => { 
                const obj = {
                    x: new Date(e.Date),
                    y: e.Energy
                }
                return obj;
            });
            setEnergy(data);
        });
    }

    function test() {
        console.log(props);
    }
    return props.device ? (
        <PageContainer style={{ }}>
            <Header as="h2">{props.device}</Header>
            <div style={{width: 250, height: 100}}>
                <CustomDropdown label="Wemo" placeholder="Wemo" items={[]} onClick={handleWemo} 
                labelIcon={<Icon name="linkify" style={{margin: "0px 3px"}}/>}/>
            </div>
            <div style={{width: 250, height: 100}}>
                <CustomDropdown label="Time" placeholder="Time" items={times} onClick={handleTime}/>
            </div>
            
            {/* <LineChart data={energy}></LineChart> */}
            <NetworkChart></NetworkChart>
            <OccupancyChart></OccupancyChart>
        </PageContainer>
        ) : (
        <PageContainer>
            <Header>Please choose a device on the left. Or refresh if none are showing up.</Header>
        </PageContainer>
    )
}

export default Home;