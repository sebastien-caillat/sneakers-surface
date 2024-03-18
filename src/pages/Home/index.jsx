import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import colors from '../../utils/colors';

const GlobalContainer = styled.div`
    width: 100%;
`

const TitleContainer = styled.div`
    margin-top: -2%;
    margin-left: 5%;
    @media(max-width: 1024px) {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 0px 25px 0px 25px;
    }
`

const MainTitle = styled.h1`
    @media(max-width: 1024px) {
        margin-bottom: 64px;
    }
`
const PromiseText = styled.p`
    margin-top: -32px;
    & span {
        font-weight: bold;
        color: ${colors.textalt};
    }
    @media(max-width: 1024px) {
        margin-right: 2%;
        line-height: 1.4;
        text-align: center;
        margin-bottom: 32px;
    }
`

const StyledButton = styled.button`
    width: 200px;
`

const JoinOurCommunitySection = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 50px 0 50px 0;
    padding-bottom: 60px;
    background-color: ${colors.backgroundalt};
    @media(max-width: 768px) {
        padding-bottom: 30px;
    }
`

const JoinUsText = styled.p`
    margin-top: -10px;
    margin-bottom: 40px;
    @media(max-width: 1024px) {
        text-align: center;
    }
    @media(max-width: 768px) {
        margin-bottom: 20px;
    }
`

const CreatorSignature = styled.div`
    display: flex;
    width: 100%;
    height: 150px;
    justify-content: center;
    align-items: center;
    margin-top: 2%;
`


export default function Home() {

    const navigate = useNavigate();

    const handleClick = (path) => {
        navigate(path);
    }

    return(
        <GlobalContainer>

            <TitleContainer>
                <MainTitle>Sneakers Surface</MainTitle>
                <PromiseText>LA PLATEFORME INCONTOURNABLE POUR TOUS LES <span>SNEAKERS</span> ADDICTS</PromiseText>
                <StyledButton onClick={() => handleClick('/products')}>Voir les produits</StyledButton>
            </TitleContainer>

            <JoinOurCommunitySection>
                <h2>Pas encore inscrit ?</h2>
                <JoinUsText>Rejoignez notre communauté et découvrez des milliers de modèles disponibles</JoinUsText>
                <StyledButton onClick={() => handleClick('/signup')}>S'inscrire</StyledButton>
            </JoinOurCommunitySection>

            <CreatorSignature>
                <p>© 2024 - Created by Sébastien Caillat</p>
            </CreatorSignature>

        </GlobalContainer>
    )
}