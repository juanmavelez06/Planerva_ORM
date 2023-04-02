import React from 'react';
import ReactDOM from 'react-dom'

function Nav({children}){
    return ReactDOM.createPortal(
        children,
        document.getElementById('navbar-root')
    )
}

export default Nav