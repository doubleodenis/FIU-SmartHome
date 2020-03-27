import React from "react";
import styled from "styled-components";

const Container = styled.div`
    padding: 15px;
    padding: 1em;
    border-right: 1px solid #a2a2a2;
    border-left: 1px solid #a2a2a2;
    background-color: #ebebeb;
    height:100%;
`;
const PageContainer = (props) => {
    return (
        <Container>
            {props.children}
        </Container>
    );
}

export default PageContainer;