# SmartHome

The directory structure for the repository works as follows:

Back-end:
- Everything in the /energy_io folder is related to server-side activities such as the API, database interaction, and data collection.
- In the /scripts folder, is where all data collection scripts are located. There is one for energy (EnergyUsageWemo.js), network traffic (network.js), and occupancy (occupancy.js).
- In the /api folder, is where all API routes are located for the three types of data.
- Other notable files in the root folder are:
    - server.js - this is where the express server is initialized and all connections to the server are handled.
    - connection.js - this file handles the connections with the database and exposes the query() and insert() function to the SQL database.

Front-end: 
- Everything in the /energy_io/client folder is the front-end React application. The subdirectory/energy_io/client /src contains all the files related to the SmartHome interface.
- /components folder contains the components used in the views such as the charts, and other custom components. 
- /views currently only contains one view, Home.js which contains the interface for the SmartHome interface and the logic for handling the states and component interaction.
- /services is a folder dedicated to service calls to the backend API. It is separated into three services for each data type.
- Other notable files include:
   - Router.js - this file includes all the URL routes in the application (currently only one). Using a package called react-router.
   - App.js - is the entry point into the React application and contains some logic for handling states and initializing components that would persist throughout the application.

In the Raspberry Pi:

Install RaspAP
  - In order to collect data correctly, the IoT devices you will be monitoring need to be connected to this Access Point (usually under default network raspi_webgui)
  - These IoT devices will be plugged into Wemo Insight plugs to monitor their Energy consumption

Download NodeJS (if not already downloaded)

Install github repository `git clone https://github.com/doubleodenis/FIU-SmartHome.git` 
or with SSH `git clone git@github.com:doubleodenis/FIU-SmartHome.git`

Traverse to energy_io/ folder and run `npm install` then you should be able to run `sudo npm start` 
  - Don't forget the `sudo` in order to have the correct permissions to collect network data

Traverse to energy_io/client folder and run `npm install` then you `yarn start` or `npm start`
  - This will start a localhost server for the client
  
After connecting your devices, after collecting data for a little bit, you should be able to refresh the client localhost server to see a list of IP addresses.

Then you can choose the corresponding Wemo device to that IoT device, where you will see data based on the devices chosen
  
