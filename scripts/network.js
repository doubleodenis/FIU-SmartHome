const db = require('../connection');
const pcap = require('pcap');
const moment = require("moment");
var pcap_session = null, tcp_tracker = null, devices = [];

function startNetworkTracking() {
    //Add ips to device list
    function addDevice(device) {
        const d = device.split(':')[0]; //Remove port from ip
        if(!devices.includes(d)) devices.push(d);
    }

    tcp_tracker = new pcap.TCPTracker();
    pcap_session = pcap.createSession('wlan0', { filter: "ip proto \\tcp" });
    
    tcp_tracker.on('session', function (session) {

        let localDeviceIsSrc = null;

        //Adding device to network list if part of AP domain
        if(session.src.substring(0,8) === "10.3.141") {
            addDevice(session.src);
            localDeviceIsSrc = true;
        }
        else if(session.dst.substring(0,8) === "10.3.141") {
            addDevice(session.dst);
            localDeviceIsSrc = false;
        }

        //Adding into network table
        //If src
        if(localDeviceIsSrc == true) {
            //id_network, user_id, received_bytes, sent bytes, ip_address, time
            const sent_bytes = session.sent_bytes_tcp;
            const received_bytes = session.recv_bytes_tcp;
            const ip_address = session.src.split(":")[0]; //Removing port from ip
            const time = "'" + moment(new Date()).format("YYYY-MM-DD HH:mm:ss") + "'";
            db.insert(`INSERT INTO Network (ip_address, sent_bytes, received_bytes, time) VALUES (${ip_address}, ${sent_bytes}, ${received_bytes}, ${time})`);
        }
        //device is destination so sent and received are flipped?
        else if(localDeviceIsSrc == false) {
            const sent_bytes = session.recv_bytes_tcp; 
            const received_bytes = session.sent_bytes_tcp;
            const ip_address = session.src.split(":")[0]; //Removing port from ip
            const time = "'" + moment(new Date()).format("YYYY-MM-DD HH:mm:ss") + "'";
            db.insert(`INSERT INTO Network (ip_address, sent_bytes, received_bytes, time) VALUES (${ip_address}, ${sent_bytes}, ${received_bytes}, ${time})`);
        }
        //Neither src or dest is coming from AP?
        else {
            console.log(`DEBUG: Unidentified ip on network? SRC: ${session.src} DEST: ${session.dst}`);
        }
        
    
    //   console.log("Start of session between " + session.src_name + " and " + session.dst_name);
      session.on('end', function (session) {
          console.log("End of TCP session between " + session.src_name + " and " + session.dst_name);
      });
    });
     
    pcap_session.on('packet', function (raw_packet) {
        var packet = pcap.decode.packet(raw_packet);
        tcp_tracker.track_packet(packet);
    });

    return {
        pcap_session,
        tcp_tracker,
        devices
    }
}

module.exports = {
    startNetworkTracking
};