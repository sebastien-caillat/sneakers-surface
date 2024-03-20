import React, { useState } from "react";
import styled from "styled-components";
import colors from "../../utils/colors";

import { useParams, Navigate } from "react-router-dom";
import { Button, Card, Col, Form, Input, message, Row, Spin } from "antd";
import { useAuthContext} from "../../components/context/AuthContext";
import { API } from "../../constant";
import { getToken } from "../../helpers";

const GlobalContainer = styled.div`
    display: flex;
    width: 90%;
    margin: auto;
    justify-content: center;
    margin-top: 5%;
`

const StyledCard = styled(Card)`
    display: flex;
    justify-content: center;
    background-color: ${colors.background};
    border: none;
`

const StyledForm = styled(Form)`
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
`

const StyledFormItem = styled(Form.Item)`
    .ant-form-item-label > label {
        color: ${colors.text};
    }
`

const StyledButton = styled(Button)`
    min-width: 150px;
    background-color: ${colors.backgroundbutton};
    margin-top: 24px;
`

export default function Profile() {

    const [loading, setLoading] = useState(false);
    const { user, isLoading, setUser } = useAuthContext();
    const { username } = useParams();

    if (isLoading) {
        return <Spin />;
    }
    
    if(!user || username !== user.username) {
        return <Navigate to="/error" />
    }

    const handleProfileUpdate = async(data) => {
        setLoading(true);
        
        try {
            const response = await fetch(`${API}/users/${user.id}`, {
                method: "PUT", 
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${getToken()}`,
                },
                body: JSON.stringify(data),
            });

            const responseData = await response.json();
            
            setUser(responseData);
            message.success("Data saved successfully");

        } catch (error) {

            console.error(Error);
            message.error("Error while updating the profile");

        } finally {
            setLoading(false);
        }
    };
    
    if(isLoading) {
        return <Spin size="large" />;
    }

    return(

    <GlobalContainer>
        <StyledCard className="profile_page_card">
            <StyledForm
                 layout="vertical"
                 initialValues={{
                        username: user?.username,
                        email: user?.email,
                        firstName: user?.firstname,
                        lastName: user?.lastname,
                 }}
                 onFinish={handleProfileUpdate}
            >
                <Row gutter={[16, 16]}>
                    <Col span={24}>
                        <StyledFormItem
                            label="Username"
                            name="username"
                            rules={[
                                {
                                    required: true,
                                    message: "Username is required !",
                                    type: "string",
                                },
                            ]}
                        >
                            <Input placeholder="Username" />
                        </StyledFormItem>
                    </Col>

                    <Col span={24}>
                        <StyledFormItem
                            label="Email"
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    message: "Email is required !",
                                    type: "email",
                                },
                            ]}
                        >
                            <Input placeholder="Email" />
                        </StyledFormItem>
                    </Col>

                    <Col span={24}>
                        <StyledFormItem
                            label="First Name"
                            name="firstname"
                            rules={[
                                {
                                    message: "First Name is required !",
                                    type: "string",
                                },
                            ]}
                        >
                            <Input placeholder="First Name" />
                        </StyledFormItem>
                    </Col>

                    <Col span={24}>
                        <StyledFormItem
                            label="Last Name"
                            name="lastname"
                            rules={[
                                {
                                    message: "Last Name is required !",
                                    type: "string",
                                },
                            ]}
                        >
                            <Input placeholder="Last Name" />
                        </StyledFormItem>
                    </Col>
                </Row>
                <StyledButton
                    className="profile_save_btn"
                    htmlType="submit"
                    type="primary"
                    size="large"
                >
                    {loading ? (
                        <>
                            <Spin size="small" /> Saving...               
                        </>
                    ) : (
                        "Save"
                    )}
                </StyledButton>
            </StyledForm>
        </StyledCard>
    </GlobalContainer>
    );
};