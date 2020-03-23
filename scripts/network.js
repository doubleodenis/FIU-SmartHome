var pcap = require("pcap"),
  pcap_session,
  tcp_tracker = new pcap.TCPTracker();
const db = require("../connection");
const moment = require("moment");
devices = [];

function startNetworkTracking() {
  //Add ips to device list
  function addDevice(device) {
    const d = device.split(":")[0]; //Remove port from ip
    if (!devices.includes(d)) devices.push(d);
  }
  pcap_session = pcap.createSession("wlan0", { filter: "ip proto \\tcp" });

  // listen for packets, decode them, and feed TCP to the tracker
  pcap_session.on("packet", function(raw_packet) {
    var packet = pcap.decode.packet(raw_packet);
    tcp_tracker.track_packet(packet);
  });

  pcap_session.on("complete", function() {
    console.log("pcap session complete.");
  });

  // tracker emits sessions, and sessions emit data
  tcp_tracker.on("session", function(session) {
    console.log(
      "Start of TCP session between " +
        session.src_name +
        " and " +
        session.dst_name
    );

    let localDeviceIsSrc = null;

    //Adding device to network list if part of AP domain
    if (session.src.substring(0, 8) === "10.3.141") {
      addDevice(session.src);
      localDeviceIsSrc = true;
    } else if (session.dst.substring(0, 8) === "10.3.141") {
      addDevice(session.dst);
      localDeviceIsSrc = false;
    }

    session.on("end", function(session) {
      const sent_bytes = session.send_bytes_payload;
      const received_bytes = session.recv_bytes_payload;
      const ip_address = session.src.split(":")[0]; //Removing port from ip
      const time = "'" + moment(new Date()).format("YYYY-MM-DD HH:mm:ss") + "'";
      let val =
        "'" +
        ip_address +
        "'" +
        ", " +
        sent_bytes +
        ", " +
        received_bytes +
        "," +
        time;
      console.log(
        `INSERT INTO Network (ip_address, sent_bytes, received_bytes, time) VALUES (${ip_address}, ${sent_bytes}, ${received_bytes}, ${time})`
      );
      db.insert(
        `INSERT INTO Network (ip_address, sent_bytes, received_bytes, time) VALUES (${val})`
      );
      console.log(
        "End of TCP session between " +
          session.src_name +
          " and " +
          session.dst_name
      );
    });
  });

  return {
    pcap_session,
    tcp_tracker,
    devices
  };
}

module.exports = {
  startNetworkTracking
};
