import React from "react";
import HeaderNavbar from "./HeaderNavbar";

const Layout = (props)=>{
    return(
        <>
            <HeaderNavbar />
            {props.children}
        </>
    );
}

export default Layout;