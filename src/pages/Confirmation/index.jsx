import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

import { API_BASE_URL } from "../../apiConfig";

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
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    axios.get(`${API_BASE_URL}/api/users/me`, {
      headers: {
        'Authorization': `Bearer ${authToken}`
      }
    })
    .then(response => {
      setUserName(response.data.username);
    })
    .catch(error => {
      console.error('There was an error !', error);
    });
  }, []);

  return (
    <ConfirmationContainer>
      <h1>Merci pour votre commande, {userName} !</h1>
      <h2>Votre numéro de commande : <TrackingOrder>{orderId}</TrackingOrder></h2>
    </ConfirmationContainer>
  );
}