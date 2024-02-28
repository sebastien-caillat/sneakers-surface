import React, { useState } from "react";
import { Button, Card, Col, Form, Input, message, Row, Spin } from "antd";
import { useAuthContext} from "../../context/AuthContext";
import { API } from "../../constant";
import { getToken } from "../../helpers";

export default function Profile() {

    const [loading, setLoading] = useState(false);
    const { user, isLoading, setUser } = useAuthContext();

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
        <Card className="profile_page_card">
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
                        <Form.Item
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
                        </Form.Item>
                    </Col>

                    <Col md={8} lg={8} sm={24} xs={24}>
                        <Form.Item
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
                        </Form.Item>
                    </Col>

                    <Col md={8} lg={8} sm={24} xs={24}>
                        <Form.Item
                            label="First Name"
                            name="firstName"
                            rules={[
                                {
                                    required: true,
                                    message: "First Name is required !",
                                    type: "string",
                                },
                            ]}
                        >
                            <Input placeholder="First Name" />
                        </Form.Item>
                    </Col>

                    <Col md={8} lg={8} sm={24} xs={24}>
                        <Form.Item
                            label="Last Name"
                            name="lastName"
                            rules={[
                                {
                                    required: true,
                                    message: "Last Name is required !",
                                    type: "string",
                                },
                            ]}
                        >
                            <Input placeholder="Last Name" />
                        </Form.Item>
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
        </Card>
    );
};