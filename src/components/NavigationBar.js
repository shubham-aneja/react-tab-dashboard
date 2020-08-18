import React from 'react';
import NavigationLink from './NavigationLink';

const NavigationBar = ({navLinks, handleNavClick}) => (
    <div className="navigation-bar">
        {
            navLinks.map((item, index) => <NavigationLink key={index} navLink={item} handleNavClick={handleNavClick} />)
        }
    </div>
);

export default NavigationBar;