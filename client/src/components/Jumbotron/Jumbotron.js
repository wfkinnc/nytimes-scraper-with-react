import React from "react";


const Jumbotron = ({ children }) =>
    <div style={{height: 200, width:800, clear: 'both', textAlign:"center", border: ' solid 1px'}} className="jumbotron">
        {children}
    </div>;

export default Jumbotron;