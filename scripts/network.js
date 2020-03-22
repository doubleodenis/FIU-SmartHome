const db = require('../connection');
const pcap = require('pcap');
var pcap_session = null, tcp_tracker = null;

function startNetworkTracking() {
    let sessionObj = {
        src: null,
        dst: null,
        bytes_sent: 0,
        bytes_received: 0   
    }
    
    tcp_tracker = new pcap.TCPTracker();
    pcap_session = pcap.createSession('wlan0', { filter: "ip proto \\tcp" });
    
    
    tcp_tracker.on('session', function (session) {
        db.insert(`INSERT INTO Network (ip_address, Date) VALUES (${val})`);
    
      console.log("Start of session between " + session.src_name + " and " + session.dst_name);
      session.on('end', function (session) {
          console.log("End of TCP session between " + session.src_name + " and " + session.dst_name);
      });
    });
     
    pcap_session.on('packet', function (raw_packet) {
        var packet = pcap.decode.packet(raw_packet);
        tcp_tracker.track_packet(packet);
    });
    
    // setTimeout(function () {
    //     console.log("Listening on " + pcap_session.device_name);
    // }, 5000);
    
    // setInterval(function() {
    //     console.log(pcap_session.stats());
    // }, 10000)

    return {
        pcap_session,
        tcp_tracker
    }
}

module.exports = {
    startNetworkTracking
};