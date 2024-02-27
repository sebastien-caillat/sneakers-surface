import React from "react";
import styled from "styled-components";

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 65vh;
`;

const FormTitle = styled.h1`
    margin-bottom: 50px;
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 50px;
`;

const Input = styled.input`
  padding: 10px;
  width: 350px;
  font-size: 16px;
  border-radius: 20px;
`;

const StyledButton = styled.button`
    width: 200px;
    height: 50px;
    margin: 0 25% 0 25%;
`

export default function Signup() {
  return (
    <FormContainer>
      <FormTitle>Rejoignez-nous !</FormTitle>
      <Form>
        <Input type="text" placeholder="First Name" required />
        <Input type="text" placeholder="Last Name" required />
        <Input type="text" placeholder="Address" required />
        <Input type="email" placeholder="Email" required />
        <StyledButton type="submit">Valider</StyledButton>
      </Form>
    </FormContainer>
  );
}