import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import colors from "../../utils/colors";

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`

const ErrorTitle = styled.h1`
  font-size: 180px;
`

const ErrorText = styled.p`
    margin-top: -120px;
    font-size: 40px;
`

const BackLink = styled(Link)`
  text-decoration: underline;
  font-family: "Roboto", sans-serif;
  color: ${colors.text};
  &:visited: {
    color: ${colors.text};
  }
  &:hover {
    transform: scale(1.1);
`

export default function Error() {
  return (
    <ErrorContainer>
      <ErrorTitle>404</ErrorTitle>
      <ErrorText>Page not found</ErrorText>
      <BackLink to="/">Go back to homepage</BackLink>
    </ErrorContainer>
  );
}