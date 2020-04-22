import axios from 'axios'

const hostname = process.env.PORT ? "http://localhost:" + process.env.PORT : "http://localhost:8000";
/**
 * Gets the Occupancy values between current time and {time} minutes ago
 * @param  {Number} time in minutes
 */

const getOccupancy = (user, time) => {
    return axios.get(`${hostname}/occupancy/${user}?time=${time}`, {
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
