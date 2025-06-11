import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FiMenu, FiX } from "react-icons/fi";
import { Link } from "react-router-dom";

const iconImage = "/images/icon.png";

const HeaderContainer = styled.header`
  color: white;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 98%;
  position: fixed;
  top: 0;
  z-index: 1000;
  transition: background-color 0.3s ease, backdrop-filter 0.3s ease;

  background: ${({ scrolled }) =>
    scrolled ? "rgba(255, 255, 255, 0.05)" : "transparent"};
  backdrop-filter: ${({ scrolled }) =>
    scrolled ? "blur(20px) saturate(180%)" : "none"};
  -webkit-backdrop-filter: ${({ scrolled }) =>
    scrolled ? "blur(20px) saturate(180%)" : "none"};
  border-bottom: ${({ scrolled }) =>
    scrolled ? "1px solid rgba(255, 255, 255, 0.15)" : "none"};
`;

const CompanyName = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.25rem;
  font-weight: bold;

  @media (max-width: 768px) {
    flex: 1;
    margin-right: 1rem;
    margin-top: -2rem;
  }

  img {
    width: 30px;
    height: 30px;
  }
`;

const NavContainer = styled.div`
  position: relative;

  @media (max-width: 768px) {
    flex: 1;
    display: flex;
    justify-content: flex-end;
  }
`;

const Nav = styled.nav`
  display: flex;
  gap: 1.5rem;

  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled(Link)`
  text-decoration: none;
  color: white;
  padding: 0.5rem 1rem;
  transition: background-color 0.3s, color 0.3s;
  border-radius: 4px;

  &:hover {
    background-color: rgba(255, 255, 255, 0.25);
  }

  &.active {
    background-color: rgba(255, 255, 255, 0.35);
  }
`;

const HamburgerMenu = styled.div`
  display: none;
  cursor: pointer;
  padding: 0.5rem;

  @media (max-width: 768px) {
    display: block;
  }
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  background-color: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  padding: 1rem;
  border-radius: 8px;
  width: 150px;
  display: ${({ isOpen }) => (isOpen ? "block" : "none")};

  a {
    display: block;
    margin-bottom: 0.5rem;
  }
`;

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <HeaderContainer scrolled={scrolled}>
      <CompanyName>
        <img src={iconImage} alt="Company Icon" />
        Swiftmove
      </CompanyName>

      <NavContainer>
        <HamburgerMenu onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? (
            <FiX size={24} color="white" />
          ) : (
            <FiMenu size={24} color="white" />
          )}
        </HamburgerMenu>

        <Nav>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/about">About Us</NavLink>
          <NavLink to="/pricing">Pricing</NavLink>
          <NavLink to="/products">Products</NavLink>
        </Nav>

        <DropdownMenu isOpen={menuOpen}>
          <NavLink to="/" onClick={() => setMenuOpen(false)}>
            Home
          </NavLink>
          <NavLink to="/about" onClick={() => setMenuOpen(false)}>
            About Us
          </NavLink>
          <NavLink to="/pricing" onClick={() => setMenuOpen(false)}>
            Pricing
          </NavLink>
          <NavLink to="/products" onClick={() => setMenuOpen(false)}>
            Products
          </NavLink>
        </DropdownMenu>
      </NavContainer>
    </HeaderContainer>
  );
};

export default Header;
