import React from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";

const ConfirmationContainer = styled.div`
    display: flex;
    flex-direction: column;
    text-align: center;
    width: 90%;
    margin: 64px auto;
`

const TrackingOrder = styled.span`
    color: red;
    &:hover {
        text-decoration: underline;
        cursor: pointer;
    }
`

export default function Confirmation() {
  const location = useLocation();
  const { orderId } = location.state;

  return (
    <ConfirmationContainer>
      <h1>Merci pour votre commande !</h1>
      <h2>Votre numéro de commande : <TrackingOrder>{orderId}</TrackingOrder></h2>
    </ConfirmationContainer>
  );
}