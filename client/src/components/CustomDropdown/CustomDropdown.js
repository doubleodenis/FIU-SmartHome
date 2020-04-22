import React, {useState, useEffect} from 'react'
import { Dropdown } from 'semantic-ui-react'

const CustomDropdown = (props) => {
    let [items, setItems] = useState(props.items);
    let [defaultVal, setDefault] = useState(null);

    useEffect(() => {
        const newItems = props.items.map(item => {
        	return {key: item.text, ...item}
    	});
	
	setItems(newItems);
	setDefault(newItems.length > 0 ? newItems[0].value : null);
    }, [props.items]);

    return (
        <div>
            <span style={{paddingLeft: 3}}>{props.label}{props.labelIcon}</span>
            <Dropdown 
            fluid
            selection
            placeholder={props.placeholder}  
            options={items}
            onChange={props.onClick}
            defaultValue={defaultVal}
            />
        </div>
    )
}
  

export default CustomDropdown
