import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import { removeToken } from "../../helpers";
import styled, { keyframes, css } from "styled-components";
import { StyledLink } from "../../utils/Atoms";

import colors from "../../utils/colors";
import sneakerslogo from "../../assets/sneakersurface.svg";

const HeaderContainer = styled.div`
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-between;
`

// Styled components of the logo

const LogoContainer = styled.div`
    display: flex;
    cursor: pointer;
    margin-left: 2.5%;
`

const BrandLogo = styled.img`
    width: 200px;
    height: 200px;
`

// Styled components of the Login/Logout Buttons

const AuthButton = styled.button`
    width: 100px;
    height: 40px;
    border-radius: 5px;
    margin: 0 20px 0 0;
`

// Styled components of the hamburger menu and its items

const MenuContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding-right: 5%;
    z-index: 2;
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
  margin-right: 20px;
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

// Styled component of the navigation menu that is displayed when the hamburger icon is clicked

const slideIn = keyframes`
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(0);
  }
`;

const slideOut = keyframes`
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(100%);
  }
`;

const Navigation = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: absolute;
  z-index: 1;
  background-color: ${colors.backgroundbutton};
  width: 300px;
  top: 150px;
  right: 0;
  padding: 10px;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  box-shadow: ${props => props.open ? '0px 8px 16px 0px rgba(0,0,0,0.2)' : 'none'};
  transition: box-shadow 0.3s ease-out;
  animation: ${props => props.open ? css`${slideIn} 0.5s forwards` : (props.unmounting ? css`${slideOut} 0.5s forwards` : 'none')};
` 

export default function Header() {

    const [open, setOpen] = useState(false);
    const [unmounting, setUnmounting] = useState(false);
    const [renderNav, setRenderNav] = useState(false);

    const handleMenuClick = () => {
      if (open) {
        setUnmounting(true);
        setTimeout(() => {
          setRenderNav(false);
          setUnmounting(false);
        }, 500); // delay equal to the animation duration
      } else {
        setRenderNav(true);
      }
      setOpen(!open);
    };

    const navigate = useNavigate();
    const { user, setUser } = useAuthContext();

    const handleClick = () => {
        navigate('/');
    }

    const handleLogout = () => {
      removeToken();
      setUser(null);
      navigate("/signin", { replace: true});
    }

    return(
        <HeaderContainer>

          <LogoContainer onClick={handleClick}>
            <BrandLogo src={sneakerslogo} alt="Sneakers Surface Logo"/>
          </LogoContainer>

          <MenuContainer>

            <div>

              { user ? (
                <>
                  <Link to={`/profile/${user.username}`}>
                    <AuthButton type="link">
                      {user.username}
                    </AuthButton>
                  </Link>
                  <AuthButton type="primary" onClick={handleLogout}>
                    Logout
                  </AuthButton>
                </>
              ) : (
                <>
                  <Link to="/signin">
                    <AuthButton href="/signin" type="link">
                      Login
                    </AuthButton>
                  </Link>
                  <Link to="/signup">
                    <AuthButton href="/signup" type="primary">
                      SignUp
                    </AuthButton>
                  </Link>
                </>
              )}

            </div>

            <HamburgerMenuContainer onClick={handleMenuClick}>
              <Bar open={open} />
              <Bar open={open} />
              <Bar open={open} />
            </HamburgerMenuContainer>

            <MenuText>Menu</MenuText>

              {renderNav && <Navigation open={open} unmounting={unmounting}>
                <StyledLink to="/">Accueil</StyledLink>
                <StyledLink to={`/profile/${user.username}`}>Mon profil</StyledLink>
                <StyledLink to="/products">Nos produits</StyledLink>
              </Navigation>}

          </MenuContainer>

        </HeaderContainer>
    )
}