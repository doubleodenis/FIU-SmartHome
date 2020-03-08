import React from "react";
import styled from "styled-components";
import "./Navbar.css"
const Header = styled.header`
	padding-top: .5em;
	padding-bottom: .5em;
	border: 1px solid #a2a2a2;
	background-color: #f4f4f4;
	-webkit-box-shadow: 0px 0px 14px 0px rgba(0,0,0,0.75);
	-moz-box-shadow: 0px 0px 14px 0px rgba(0,0,0,0.75);
	box-shadow: 0px 0px 14px 0px rgba(0,0,0,0.75);
	-webkit-border-radius: 5px;
	-moz-border-radius: 5px;
	border-radius: 5px;
`;

const List = styled.ul`
    list-style-type: none;
    margin: 0;
    padding: 0;
    width: 75:
`;

const ListItem = styled.li`
    font-size: 16px;
    width: 100px;
    text-decoration: none;
`;

const Brand = styled.h1`
    font-size: 24px;
    font-weight: 700;
    width: 25%;
`;
const Navbar = () => {
    return (
        // <Header class="Header">
        //     <Brand class="logo"><a href="#">Flexbox</a></Brand>
        //     <List class="main-nav">
        //         <ListItem><a href="#">Home</a></ListItem>
        //         <ListItem><a href="#">About</a></ListItem>
        //         <ListItem><a href="#">Portfolio</a></ListItem>
        //         <ListItem><a href="#">Contact</a></ListItem>
        //     </List>
	    // </Header> 
        <header class="header">
            <h1 class="logo"><a href="#">Energy I/O</a></h1>
            <ul class="main-nav">
                <li><a href="#">Home</a></li>
                <li><a href="#">About</a></li>
                <li><a href="#">Contact</a></li>
            </ul>
        </header> 

    )
}

export default Navbar;
