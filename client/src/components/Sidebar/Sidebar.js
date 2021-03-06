import React from 'react'
import { Menu, Button, Icon, Sidebar, Divider, Header } from 'semantic-ui-react'


const CustomSidebar = (props) => {

    /**
     * Creates the device list to be shown in the left sidebar
     * @param {Array} devices The IP addresses of the listed devices 
     */
    function createDeviceList (devices) {
        return devices ? devices.map(device => {
            return (
                <Menu.Item key={device.ip_address} 
                onClick={() => props.onSelect(device)}
                active={props.selected === device}>
                    {device.ip_address}
                </Menu.Item>
            );
        }) : [];
    }

    return (
        <Sidebar
        as={Menu}
        animation="push"
        direction="left"
        icon='labeled'
        inverted
        vertical
        visible
        width='thin'
        style={{paddingTop: 10}}
        >
            <Header as='a' href="/" style={{color: "white"}}>energy.io</Header>
            <Divider />
            <Button
            style={{ marginBottom: 15 }} 
            compact 
            icon 
            labelPosition="right" 
            onClick={props.onRefresh}>
                    Devices
                <Icon name="refresh" style={{margin: "0px 10px"}}/>
            </Button>
            {createDeviceList(props.devices)}   
            {/* <Menu items={devices}/> */}
    </Sidebar>
    )
}

export default CustomSidebar
