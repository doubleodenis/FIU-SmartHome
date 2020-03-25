import React, {useState} from 'react'
import { Menu, Button, Icon, Sidebar, Divider, Container, Header } from 'semantic-ui-react'


const CustomSidebar = (props) => {
    function createDeviceList (devices) {
        return devices.map(device => {
            return (
                <Menu.Item key={device} 
                onClick={() => props.onSelect(device)}
                active={props.selected === device}>
                    {device}
                </Menu.Item>
            )
        })
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
            <Button compact icon labelPosition="right">Devices<Icon name="refresh" style={{margin: "0px 10px"}}/></Button>
            {createDeviceList(props.devices)}   
            {/* <Menu items={devices}/> */}
    </Sidebar>
    )
}

export default CustomSidebar
