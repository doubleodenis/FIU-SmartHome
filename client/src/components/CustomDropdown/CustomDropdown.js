import React from 'react'
import { Dropdown } from 'semantic-ui-react'

const CustomDropdown = (props) => {

    const items = props.items.map(item => {
        return {key: item.text, ...item}
    })
    console.log(props.labelIcon)
    return (
        <div>
            <span style={{paddingLeft: 3}}>{props.label}{props.labelIcon}</span>
            <Dropdown 
            fluid
            selection
            placeholder={props.placeholder}  
            options={items}
            onClick={props.onClick}
            defaultValue={items[0].value}
            />
        </div>
    )
}
  

export default CustomDropdown