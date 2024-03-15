import React from "react";
 
import Navbar from "./Navbar";
 const Layout = (props) => {
   return (
     <div>
        <Navbar/>
        this is layout page
        {props.children}
     </div>
   )
 }
 
 export  default Layout;