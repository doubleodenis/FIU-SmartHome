import React from "react";
import styled from "styled-components";

const Container = styled.div`
    margin: 0px 5em;
    padding: 15px;
    display: flex;
    padding: .5em;
    border-right: 1px solid #a2a2a2;
    border-left: 1px solid #a2a2a2;
    // background-color: #f4f4f4;
    background-color: gray;
    min-height: -webkit-fill-available;
    min-height: 90vh;
`;
const PageContainer = (props) => {
    return (
        <Container>
            {props.children}
        </Container>
    );
}

export default PageContainer;