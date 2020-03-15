import axios from 'axios'

const hostname = process.env.PORT ? "http://localhost:" + process.env.PORT : "http://localhost:5050";
/**
 * Gets the energy values between current time and {time} minutes ago
 * @param  {Number} time in minutes
 */

const getEnergy = (time) => {
    return axios.get(`${hostname}/energy?time=${time}`, {
        headers:{    
        },
    })
    .then(res => res.data)
    .catch(err => console.log(err));
}

const EnergyService = {
    getEnergy
}

export default EnergyService;