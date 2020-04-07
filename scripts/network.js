var pcap = require("pcap"),
  pcap_session,
  tcp_tracker = new pcap.TCPTracker();
const db = require("../connection");
const moment = require("moment");
devices = [];

function startNetworkTracking() {
  pcap_session = pcap.createSession("wlan0", { filter: "ip proto \\tcp" });

  // listen for packets, decode them, and feed TCP to the tracker
  pcap_session.on("packet", function (raw_packet) {
    var packet = pcap.decode.packet(raw_packet);
    tcp_tracker.track_packet(packet);
  });

  pcap_session.on("complete", function () {
    console.log("pcap session complete.");
  });

  // tracker emits sessions, and sessions emit data
  tcp_tracker.on("session", function (session) {
    console.log(
      "Start of TCP session between " +
        session.src_name +
        " and " +
        session.dst_name
    );

    session.on("end", function (session) {
      const sent_bytes = session.send_bytes_payload;
      const received_bytes = session.recv_bytes_payload;
      const ip_address = session.src.split(":")[0]; //Removing port from ip

      let date = moment();

      const remainder = 5 - (date.seconds() % 5);
      date = moment(date)
        .add(remainder, "seconds")
        .format("YYYY-MM-DD HH:mm:ss");

      let val =
        "'" +
        ip_address +
        "'" +
        ", " +
        sent_bytes +
        ", " +
        received_bytes +
        ",'" +
        date +
        "', 1";

      let sql = `Call 5Network(${val})`;
      console.log(sql);
      db.insert(sql);

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
    devices,
  };
}

module.exports = {
  startNetworkTracking,
};
