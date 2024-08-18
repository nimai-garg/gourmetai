// HamburgerMenu.jsx
import React, { useState } from 'react';
import styled from 'styled-components';
import hamburgerIcon from './hamburger-icon.svg'; // Update with the path to your hamburger icon

const MenuWrapper = styled.div`
  position: relative;
`;

const MenuIcon = styled.img`
  width: 40px; // Adjust the size as needed
  cursor: pointer;
`;

const MenuContent = styled.div`
  display: ${props => (props.open ? 'block' : 'none')};
  position: absolute;
  top: 50px; // Adjust as needed
  right: 0;
  background: #fff; // Adjust background as needed
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  width: 200px; // Adjust width as needed
`;

const MenuItem = styled.a`
  display: block;
  padding: 15px;
  text-decoration: none;
  color: #333; // Adjust color as needed
  &:hover {
    background: #f4f4f4; // Adjust hover background as needed
  }
`;

const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <MenuWrapper>
      <MenuIcon src={hamburgerIcon} alt="Menu" onClick={toggleMenu} />
      <MenuContent open={isOpen}>
        <MenuItem href="#pricing">Pricing</MenuItem>
        <MenuItem href="#feedback">Feedback</MenuItem>
        <MenuItem href="#action">Action Button</MenuItem>
      </MenuContent>
    </MenuWrapper>
  );
};

export default MobileNav;