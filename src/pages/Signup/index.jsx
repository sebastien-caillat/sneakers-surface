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
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import { API } from "../../constant";
import { setToken } from "../../helpers"; 
import styled from "styled-components";

const FormContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 75vh;
  width: 100%;
`

const StyledCard = styled(Card)`
  width: 700px;
  height: 500px;
`

export default function Signup() {

  const navigate = useNavigate();

  const { setUser } = useAuthContext();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const onFinish = async (values) => {
    setIsLoading(true);
    try{
      const response = await fetch(`${API}/auth/local/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();
      if (data?.error) {
        throw data?.error;
      } else {

        setToken(data.jwt);
        setUser(data.user);

        message.success(`Bienvenue à bord, ${data.user.username} !`);

        navigate("/profile", { replace: true });

      }
    } catch(error) {
      console.error(error);
      setError(error?.message ?? "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return(
    <Fragment>
      <FormContainer>
        <Row align="middle">
          <Col offset={0}>
            <StyledCard title="Rejoignez-nous !">
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
                <Form.Item
                  label="Username"
                  name="username"
                  rules={[
                    {
                      required: true,
                      type: "string",
                    },
                  ]}
                >
                  <Input placeholder="Username" />
                </Form.Item>

                <Form.Item
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
                </Form.Item>

                <Form.Item
                  label="Password"
                  name="password"
                  rules={[
                    {
                      required: true,
                      type: "string"
                    },
                  ]}
                >
                  <Input.Password placeholder="Password" />
                </Form.Item>

                <Form.Item>
                  <Button 
                    type="primary" 
                    htmlType="submit" 
                    className="login_submit_btn"
                  >
                    Submit {isLoading && <Spin size="small"/>}
                  </Button>
                </Form.Item>

              </Form>

              <Typography.Paragraph className="form_help_text">
                Vous avez déjà un compte ? <Link to="/signin">Connectez-vous</Link>
              </Typography.Paragraph>
            </StyledCard>
          </Col>
        </Row>
      </FormContainer>
    </Fragment>
  );
};