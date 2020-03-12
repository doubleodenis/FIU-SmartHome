import React from "react";
import styled from "styled-components";
import "./Navbar.css"

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
        <header className="header">
            <h1 className="logo"><a href="#">Energy I/O</a></h1>
            <ul className="main-nav">
                <li><a href="#">Home</a></li>
                <li><a href="#">About</a></li>
                <li><a href="#">Contact</a></li>
            </ul>
        </header> 

    )
}

export default Navbar;
