import React, {useState, useEffect} from "react";
import PageContainer from "../components/PageContainer/PageContainer";
import LineChart from "../components/LineChart/LineChart";
import EnergyService from "../services/energyService";

const Home = () => {
    const [energy, setEnergy] = useState([]);
    console.log('why')
    

    useEffect(() => {
            // EnergyService.getEnergy(120).then(res => {
            //     console.log(res);
            //     const data = res.map(e => { 
            //         const obj = {
            //             x: new Date(e.Date),
            //             y: e.Energy
            //         }
            //         return obj;
            //     });
            //     setEnergy(data);
            // });
      });
    // let data = [{ idEnergy: 1, Energy: 1175, Date: "2020-03-07T19:59:35.000Z" },
    //     { idEnergy: 2, Energy: 1190, Date: "2020-03-07T19:59:36.000Z" },
    //     { idEnergy: 3, Energy: 1190, Date: "2020-03-07T19:59:37.000Z" },
    //     { idEnergy: 4, Energy: 1145, Date: "2020-03-07T19:59:38.000Z" },
    //     { idEnergy: 5, Energy: 1145, Date: "2020-03-07T19:59:39.000Z" },
    //     { idEnergy: 6, Energy: 1145, Date: "2020-03-07T19:59:40.000Z" },
    //     { idEnergy: 7, Energy: 1135, Date: "2020-03-07T19:59:42.000Z" },
    //     { idEnergy: 8, Energy: 1135, Date: "2020-03-07T19:59:43.000Z" },
    //     { idEnergy: 9, Energy: 1130, Date: "2020-03-07T19:59:44.000Z" },
    //     { idEnergy: 11, Energy: 1175, Date: "2020-03-07T19:59:44.000Z" },
    //     { idEnergy: 12, Energy: 1195, Date: "2020-03-09T02:44:11.000Z" },
    //     { idEnergy: 14, Energy: 1150, Date: "2020-03-09T01:27:08.000Z" },
    //     { idEnergy: 15, Energy: 1180, Date: "2020-03-09T01:30:59.000Z" },
    //     { idEnergy: 16, Energy: 1175, Date: "2020-03-09T01:31:42.000Z" },
    //     { idEnergy: 17, Energy: 1185, Date: "2020-03-09T01:31:43.000Z" },
    //     { idEnergy: 18, Energy: 1155, Date: "2020-03-09T01:31:46.000Z" },
    //     { idEnergy: 19, Energy: 1145, Date: "2020-03-09T01:31:47.000Z" },
    //     { idEnergy: 20, Energy: 1190, Date: "2020-03-09T01:31:50.000Z" },
    //     { idEnergy: 21, Energy: 1185, Date: "2020-03-09T01:31:51.000Z" },
    //     { idEnergy: 22, Energy: 1845, Date: "2020-03-09T01:31:54.000Z" },
    //     { idEnergy: 23, Energy: 1730, Date: "2020-03-09T01:31:55.000Z" },
    //     { idEnergy: 24, Energy: 1605, Date: "2020-03-09T01:31:58.000Z" } ]

    return (
        <PageContainer>
            <LineChart data={energy}></LineChart>
        </PageContainer>
    )
}

export default Home;