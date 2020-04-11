import axios from 'axios'

const hostname = process.env.PORT ? "http://localhost:" + process.env.PORT : "http://localhost:5050";
/**
 * Gets the Occupancy values between current time and {time} minutes ago
 * @param  {Number} time in minutes
 */

const getOccupancy = (time) => {
    return axios.get(`${hostname}/occupancy/?time=${time}`, {
        headers:{
        },
    })
    .then(res => res.data)
    .catch(err => console.log(err));
}

const OccupancyService = {
    getOccupancy
}

export default OccupancyService;
