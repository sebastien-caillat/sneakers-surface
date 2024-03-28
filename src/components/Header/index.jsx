import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { removeToken } from "../../helpers";
import styled, { keyframes, css } from "styled-components";
import { StyledLink } from "../../utils/Atoms";

import colors from "../../utils/colors";
import sneakerslogo from "../../assets/sneakersurface.svg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

const HeaderContainer = styled.div`
    display: flex;
    width: 90%;
    margin: auto;
    align-items: center;
    justify-content: center;
    @media(max-width: 768px) {
      flex-direction: column;
    }
`

const HeaderResponsiveMenu = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`


// Styled components of the logo

const LogoContainer = styled.div`
    display: flex;
    cursor: pointer;
    width: 100%;
    margin-left: -3%;
    @media(max-width: 1024px) {
      margin-left: -6%;
    }
    @media(max-width: 768px) {
      margin-left: 0;
      justify-content: center;
    }
`

const BrandLogo = styled.img`
    width: 200px;
    height: 200px;
    &:hover {
      transform: scale(1.1);
    }
    @media(max-width: 768px) {
        width: 170px;
        height: 170px;
    }
`

// Styled components of the Login/Logout Buttons

const AuthSection = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 5%;
    @media(max-width: 768px) {
      margin: 0 0 0 3%;
    }
`

const AuthButton = styled.button`
    min-width: 100px;
    border-radius: 25px;
    margin: 0 15px 0 15px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    @media(max-width: 768px) {
      margin: 0 10px 0 10px;
    }
`

// Styled components of the hamburger menu and its items

const MenuContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    z-index: 2;
    width: 100%;
`;

const MenuText = styled.p`
    position: relative;
    top: 10px;
    @media(max-width: 768px) {
      display: none;
    }
`;

const HamburgerMenuContainer = styled.div`
  width: 30px;
  height: 20px;
  position: relative;
  cursor: pointer;
  margin-right: 30px;
`

const Bar = styled.div`
  width: 100%;
  height: 4px;
  background-color: #ffffff;
  margin: 5px 0;
  transition: all 0.3s;
  @media(max-width: 768px) {
    width: 130%;
  }

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

const CartIcon = styled(FontAwesomeIcon)`
  width: 30px;
  height: 40px;
  margin-right: 30px;
  cursor: pointer;
  margin-bottom: -10px;
  &:hover {
    transform: scale(1.1);
  }
  @media(max-width: 768px) {
    margin: 0px 20px -10px 10px;
  }
`;

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

  @media(max-width: 768px) {
    top: 235px;
  }
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
        <HeaderResponsiveMenu>
          <AuthSection>

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

          </AuthSection>

          <MenuContainer>

            <CartIcon icon={faShoppingCart} onClick={() => navigate("/cart")} />

            <HamburgerMenuContainer onClick={handleMenuClick}>
              <Bar open={open} />
              <Bar open={open} />
              <Bar open={open} />
            </HamburgerMenuContainer>

            <MenuText>Menu</MenuText>

              {renderNav && <Navigation open={open} unmounting={unmounting}>
                <StyledLink to="/">Accueil</StyledLink>
                <StyledLink to={user ? `/profile/${user.username}` : "/signup"}>Mon profil</StyledLink>
                <StyledLink to="/products">Nos produits</StyledLink>
              </Navigation>}

          </MenuContainer>
        
        </HeaderResponsiveMenu>
        </HeaderContainer>
    )
}