import React, {useState, useEffect} from "react";
import PageContainer from "../components/PageContainer/PageContainer";
import LineChart from "../components/LineChart/LineChart";
import EnergyService from "../services/energyService";
// import Dropdown from "../components/Dropdown/Dropdown"
import { Dropdown } from "semantic-ui-react";

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


    function selectTime(obj) {
        console.log(obj);
    }
    return (
        <PageContainer>
            {/* <Dropdown placeholder="test" values={[{name: '1', value: '1'}]} onSelect={(obj) => selectTime(obj)}/> */}
            {/* <Dropdown placeholder="help"></Dropdown> */}
            <LineChart data={energy}></LineChart>
        </PageContainer>
    )
}

export default Home;