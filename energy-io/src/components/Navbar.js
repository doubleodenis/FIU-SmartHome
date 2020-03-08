import React from "react";
import styled from "styled-components";

const Nav = styled.nav`
    width: 100vw;
    height: 50px;
    background: #a2fa4a;
    color: white;
    padding: 5px;
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

const Header = styled.span`
    font-size: 24px;
    font-weight: 700;
    width: 25%;
`;
const Navbar = () => {
    return (
        <Nav>
            <Header>Energy I/O</Header>
            <List>
                <ListItem>Home</ListItem>
            </List>
        </Nav>
    )
}

export default Navbar;
