import React from 'react';

const NavigationLink = ({navLink, handleNavClick}) => {
    const pathname = navLink.replace(/\s/g, ''); 
    return (
        <div className="navigation-tab" onClick={(event) => handleNavClick(event, pathname)}>
            <span className="navigation-link">{navLink}</span>
        </div>
    );
}

export default NavigationLink;