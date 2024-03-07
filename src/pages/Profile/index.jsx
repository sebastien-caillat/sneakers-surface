import React, { useState } from "react";
import styled from "styled-components";
import colors from "../../utils/colors";

import { useParams, Navigate } from "react-router-dom";
import { Button, Card, Col, Form, Input, message, Row, Spin } from "antd";
import { useAuthContext} from "../../context/AuthContext";
import { API } from "../../constant";
import { getToken } from "../../helpers";

const StyledCard = styled(Card)`
    display: flex;
    justify-content: center;
    background-color: ${colors.background};
    border: none;
`

const StyledFormItem = styled(Form.Item)`
    .ant-form-item-label > label {
        color: ${colors.text};
    }
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
        <StyledCard className="profile_page_card">
            <Form
                 layout="vertical"
                 initialValues={{
                        username: user?.username,
                        email: user?.email,
                        firstName: user?.firstName,
                        lastName: user?.lastName,
                 }}
                 onFinish={handleProfileUpdate}
            >
                <Row gutter={[16, 16]}>
                    <Col md={8} lg={8} sm={24} xs={24}>
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

                    <Col md={8} lg={8} sm={24} xs={24}>
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

                    <Col md={8} lg={8} sm={24} xs={24}>
                        <StyledFormItem
                            label="First Name"
                            name="firstName"
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

                    <Col md={8} lg={8} sm={24} xs={24}>
                        <StyledFormItem
                            label="Last Name"
                            name="lastName"
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
                <Button
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
                </Button>
            </Form>
        </StyledCard>
    );
};