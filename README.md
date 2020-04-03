# energy_io

In the Raspberry Pi:

Install RaspAP
  - In order to collect data correctly, the IoT devices you will be monitoring need to be connected to this Access Point (usually under default network raspi_webgui)
  - These IoT devices will be plugged into Wemo Insight plugs to monitor their Energy consumption

Download NodeJS (if not already downloaded)

Install github repository `git clone https://github.com/doubleodenis/energy_io.git` 
or with SSH `git clone git@github.com:doubleodenis/energy_io.git`

Traverse to energy_io/ folder and run `npm install` then you should be able to run `sudo npm start` 
  - Don't forget the `sudo` in order to have the correct permissions to collect network data

Traverse to energy_io/client folder and run `npm install` then you `yarn start` or `npm start`
  - This will start a localhost server for the client
  
After connecting your devices, after collecting data for a little bit, you should be able to refresh the client localhost server to see a list of IP addresses.

Then you can choose the corresponding Wemo device to that IoT device, where you will see data based on the devices chosen
  
