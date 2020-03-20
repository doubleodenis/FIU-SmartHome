import React, {useState, useEffect} from "react";
import PageContainer from "../components/PageContainer/PageContainer";
import LineChart from "../components/LineChart/LineChart";
import EnergyService from "../services/energyService";
import OccupancyChart from "../components/OccupancyChart/OccupancyChart";
import NetworkChart from "../components/NetworkChart/NetworkChart";
import CustomDropdown from "../components/CustomDropdown/CustomDropdown";

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

const Home = () => {
    const [energy, setEnergy] = useState([]);

    //Used as componentDidMount
    // useEffect(() => {
    //     getEnergy(setEnergy);
        
    //     const interval = setInterval(function () {
    //         // getEnergy(setEnergy)
    //     }, 5000);

    //     setTimeout(function() {
    //         clearInterval(interval);
    //     }, 15000)
    // }, []);

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
    return (
        <PageContainer>
            {/* <Dropdown placeholder="test" values={[{name: '1', value: '1'}]} onSelect={(obj) => selectTime(obj)}/> */}
            <div style={{width: 250, height: 100}}>
                <CustomDropdown placeholder="Time" items={times}></CustomDropdown>
            </div>
            
            {/* <LineChart data={energy}></LineChart> */}
            <NetworkChart></NetworkChart>
            <OccupancyChart></OccupancyChart>
        </PageContainer>
    )
}

export default Home;