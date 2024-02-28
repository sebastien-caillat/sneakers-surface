import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import colors from '../../utils/colors';

const GlobalContainer = styled.div`
    width: 100%;
`

const TitleContainer = styled.div`
    margin-left: 5%;
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
`

const JoinUsText = styled.p`
    margin-top: -10px;
    margin-bottom: 40px;
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

        </GlobalContainer>
    )
}