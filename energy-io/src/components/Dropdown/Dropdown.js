import React, {useState} from "react";
import styled from "styled-components";

const DropdownContainer = styled.div`
    background: #dfdfdf;
    color: white;
`;
const DropdownInput = styled.div`
    width: 200px;
    height: 50px;
    border-radius: 5px;
    font-size: 16px;
    font-weight: 600;
    display: flex;
    align-items: center;
    justify-content: center;
`;
const DropdownBox = styled.ul`
    z-index: 25;
`;

const DropdownValue = styled.li`
    width: 200px;
    height: 25px;
    // border-radius: 5px;
`;
/**
 * @param  {} props.placeholder placeholder value
 * @param  {} props.values Array of name and values for drop down i.e: [{name: 'Ten', value: '10'}]
 */
const Dropdown = (props) => {
    const [show, setShow] = useState(false);

    function createChildren() {
        if(props.values.length > 0) {
            return props.values.map((obj, index) => {
                return (
                    <DropdownValue key={index} onClick={props.onSelect(obj)}/>
                )
            })
        }
    }
    
    function toggleDropdown(e, setToggle = null) {
        console.log(show)
        if(setToggle) setShow(setToggle);
        else setShow(!show);
    }


    return (
        // <DropdownContainer>
            <DropdownInput onClick={e => toggleDropdown(e)}>{props.placeholder}</DropdownInput>
            // <DropdownBox hidden={!show}>
                // {createChildren(props.values)}
            // </DropdownBox>
        // </DropdownContainer>
    )
}

export default Dropdown;