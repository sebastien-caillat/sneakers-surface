import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { StyledLink } from "../../utils/Atoms";
import colors from "../../utils/colors";

import sneakerslogo from "../../assets/sneakersurface.svg";

const HeaderContainer = styled.div`
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-between;
`

const LogoContainer = styled.div`
    display: flex;
    cursor: pointer;
    margin-left: 2.5%;
`

const BrandLogo = styled.img`
    width: 200px;
    height: 200px;
`

const MenuContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-right: 5%;
`;

const MenuText = styled.p`
    position: relative;
    top: 10px;
`;

const HamburgerMenuContainer = styled.div`
  width: 30px;
  height: 20px;
  position: relative;
  cursor: pointer;
  margin-right: 10px;
`

const Bar = styled.div`
  width: 100%;
  height: 4px;
  background-color: #ffffff;
  margin: 5px 0;
  transition: all 0.3s;

  ${props => props.open && `
    &:nth-child(1) {
      transform: rotate(45deg);
      position: relative;
      top: 10px;
    }

    &:nth-child(2) {
      opacity: 0;
    }

    &:nth-child(3) {
      transform: rotate(-45deg);
      position: relative;
      top: -8px;
    }
  `}
`

const Navigation = styled.div`
  display: ${props => props.open ? 'flex' : 'none'};
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: absolute;
  background-color: ${colors.backgroundalt};
  width: 400px;
  height: 400px; 
  top: 150px;
  padding: 10px;
  border-radius: 20px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
`
 

export default function Header() {

    const [open, setOpen] = useState(false);

    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/');
    }

    return(
        <HeaderContainer>

            <LogoContainer onClick={handleClick}>
              <BrandLogo src={sneakerslogo} alt="Sneakers Surface Logo"/>
            </LogoContainer>

          <MenuContainer>

            <HamburgerMenuContainer onClick={() => setOpen(!open)}>
              <Bar open={open} />
              <Bar open={open} />
              <Bar open={open} />
            </HamburgerMenuContainer>

              <MenuText>Menu</MenuText>

            <Navigation open={open}>

              <StyledLink to="/">Accueil</StyledLink>
              <StyledLink to="/signup">S'inscrire</StyledLink>
              <StyledLink to="/login">Se connecter</StyledLink>
              <StyledLink to="/products">Nos produits</StyledLink>

            </Navigation>

          </MenuContainer>

        </HeaderContainer>
    )
}