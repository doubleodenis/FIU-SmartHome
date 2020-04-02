import React from 'react'
import { Dropdown } from 'semantic-ui-react'

const CustomDropdown = (props) => {

    const items = props.items.map(item => {
        return {key: item.text, ...item}
    })
 
    return (
        <div>
            <span style={{paddingLeft: 3}}>{props.label}{props.labelIcon}</span>
            <Dropdown 
            fluid
            selection
            placeholder={props.placeholder}  
            options={items}
            onChange={props.onClick}
            defaultValue={items[0].value}
            />
        </div>
    )
}
  

export default CustomDropdown
