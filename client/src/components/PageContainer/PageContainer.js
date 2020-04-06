import React from "react";

const PageContainer = (props) => {
    return (
        <div style={{ padding: '1em', borderRight: '1px solid #a2a2a2', borderLeft: '1px solid #a2a2a2', backgroundColor: '#ebebeb', height: '100%' }}>
            {props.children}
        </div>
    );
}

export default PageContainer;
