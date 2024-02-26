import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import colors from '../../utils/colors';

const GlobalContainer = styled.div`
    width: 100%;
    margin: 0% 5% 0% 5%;
`

const MainTitle = styled.h1`

`
const PromiseText = styled.p`
    margin-top: -32px;
    & span {
        font-weight: bold;
        color: ${colors.textalt};
    }
`

const SeeProductsButton = styled.button`
    width: 200px;
    height: 50px;
`

export default function Home() {

    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/products');
    }

    return(
        <GlobalContainer>
            <MainTitle>Sneakers Surface</MainTitle>
            <PromiseText>LA PLATEFORME INCONTOURNABLE POUR TOUS LES <span>SNEAKERS</span> ADDICTS</PromiseText>
            <SeeProductsButton onClick={handleClick}>Voir les produits</SeeProductsButton>
        </GlobalContainer>
    )
}