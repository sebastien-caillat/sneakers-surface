import {
    Alert,
    Button,
    Card,
    Col,
    Form,
    Input,
    message,
    Row,
    Spin,
    Typography,
} from "antd";
import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import { API } from "../../constant";
import { setToken } from "../../helpers";
import styled from "styled-components";
import colors from "../../utils/colors";

const FormContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 75vh;
  width: 100%;
`

const StyledCard = styled(Card)`
  width: 700px;
  height: 350px;
  background-color: ${colors.background};
  border: none;
  .ant-card-head-title {
    color: ${colors.text};
    @media(max-width: 768px) {
        font-size: 18px;
        text-align: center;
    }
  }
  @media(max-width: 768px) {
    display: flex;
    flex-direction: column;
    width: 95%;
  }
`

const StyledFormItem = styled(Form.Item)`
    .ant-form-item-label > label {
        color: ${colors.text};
    }
`

const StyledTypo = styled(Typography.Paragraph)`
    color: ${colors.text};
    margin-top: 16px;
`

const StyledButton = styled(Button)`
    min-width: 120px;
    background-color: ${colors.backgroundbutton};
`

export default function SignIn() {

    const navigate = useNavigate();

    const { setUser } = useAuthContext();

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const onFinish = async (values) => {
        setIsLoading(true);
        try {

            const value = {
                identifier: values.email,
                password: values.password,
            };

            const response = await fetch(`${API}/auth/local`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(value),
            });

            const data = await response.json();
            if (data?.error) {
                throw data?.error;
            } else {

                setToken(data.jwt);
                setUser(data.user);
                
                message.success(`Rebonjour, ${data.user.username}!`);

                navigate("/", { replace: true });
            }
        } catch (error) {
            console.error(error);
            setError(error?.message ?? "Une erreur est survenue");
        } finally {
            setIsLoading(false);
        }
    };

    return(
        <Fragment>
            <FormContainer>
                <Row align="middle">
                    <Col offset={0}>
                        <StyledCard title="Connectez-vous !">
                            {error ? (
                                <Alert
                                    className="alert_error"
                                    message={error}
                                    type="error"
                                    closable
                                    afterClose={() => setError("")}
                                />
                            ) : null}
                            <Form
                                name="basic"
                                layout="vertical"
                                onFinish={onFinish}
                                autoComplete="off"
                            >
                                <StyledFormItem
                                    label="Email"
                                    name="email"
                                    rules={[
                                        {
                                            required: true,
                                            type: "email",
                                        },
                                    ]}
                                >
                                    <Input placeholder="Email address" />
                                </StyledFormItem>

                                <StyledFormItem
                                    label="Password"
                                    name="password"
                                    rules={[
                                        {
                                            required: true,
                                        },
                                    ]}
                                >
                                    <Input.Password placeholder="Password" />
                                </StyledFormItem>

                                <StyledFormItem>
                                    <StyledButton
                                        type="primary"
                                        htmlType="submit"
                                        className="login_submit_btn"
                                    >
                                        Login {isLoading && <Spin size="small" /> }
                                    </StyledButton>
                                    <StyledTypo className="form_help_text">
                                        Vous n'avez pas de compte? <Link to="/signup">Inscrivez-vous</Link>
                                    </StyledTypo>
                                </StyledFormItem>
                            </Form>
                        </StyledCard>
                    </Col>
                </Row>
            </FormContainer>
        </Fragment>
    )
}