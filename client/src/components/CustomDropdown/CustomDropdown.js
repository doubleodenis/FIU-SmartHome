import React, { useState } from 'react'
import { Dropdown } from 'semantic-ui-react'

const CustomDropdown = (props) => {

    const items = props.items.map(item => {
        return {key: item.text, ...item}
    })

    return (
        <Dropdown 
        fluid
        selection
        placeholder={props.placeholder}  
        options={items}
        onClick={props.onClick}
        />
    )
}
  

export default CustomDropdown