import axios from 'axios'

const hostname = process.env.PORT ? "http://localhost:" + process.env.PORT : "http://localhost:8000";
/**
 * Gets the energy values between current time and {time} minutes ago
 * @param  {Number} time in minutes
 */

const getEnergy = (wemoSerialNum, time) => {
    return axios.get(`${hostname}/energy/wemo/${wemoSerialNum}?time=${time}`, {
        headers:{    
        },
    })
    .then(res => res.data)
    .catch(err => console.log(err));
}

const getWemos = () => {
    return axios.get(`${hostname}/energy/devices`, {
        headers: {}
    })
    .then(res => res.data)
    .catch(err => console.log(err))
}


const EnergyService = {
    getEnergy,
    getWemos
}

export default EnergyService;
