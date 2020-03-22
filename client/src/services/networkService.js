import axios from 'axios'

const hostname = process.env.PORT ? "http://localhost:" + process.env.PORT : "http://localhost:5050";
/**
 * Gets the network bandwidth by ip between current time and {time} minutes ago
 * @param  {Number} ip ex: 192.168.1.101
 * @param  {Number} time in minutes
 */

const getBandwidth = (ip, time) => {
    return axios.get(`${hostname}/network/${ip}?time=${time}`, {
        headers:{    
        },
    })
    .then(res => res.data)
    .catch(err => console.log(err));
}

const getNetworkDevices = () => {
    return axios.get(`${hostname}/network/devices`, {
        headers: {}
    })
    .then(res => res.data)
    .catch(err => console.log(err));
}

const NetworkService = {
    getBandwidth,
    getNetworkDevices
}

export default NetworkService;