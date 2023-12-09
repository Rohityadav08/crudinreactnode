import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";
import Layout from "../common/Layout";


const AddUser = ()=>{
    const [formdata, setFormdata] = useState({"name": "", "mobile": ""});

    const setName = (e)=>{
        setFormdata({ "name": e.target.value, "mobile": formdata.mobile });
    }

    const setMobile = (e)=>{
        setFormdata({ "name": formdata.name, "mobile": e.target.value });
    }

    async function submitHandler(e){
        e.preventDefault();
        await addUser().then((res)=>{
            console.log(res);
        }).catch((er)=>{
            console.log(er);
        });
    }

    const addUser = ()=>{
        return new Promise((resolve, reject)=>{
            try{
                let post_data = `name=${formdata.name}&mobile=${formdata.mobile}`;
                axios({
                    method: "post",
                    url: "http://localhost:5000/add_user",
                    data: post_data,
                    headers: { "Content-Type": "application/x-www-form-urlencoded" },
                }).then((res)=>{
                    return resolve(res.data);
                }).catch((er)=>{
                    return reject(er.message);
                });
            }
            catch(e){
                return reject(e.message);
            }
        });
    }

    return <Layout>
        <Container>
            <Card className="mt-5 offset-3" style={{ width: "35rem" }}>
                <Card.Body>
                    <Card.Title>Add User</Card.Title>
                    <Card.Text>
                        <Row>
                            <Col>
                                <Form>
                                    <Form.Group className="mb-3" controlId="formBasicName">
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control type="text" onChange={(e)=>setName(e)} placeholder="Name" />
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formBasicMobile">
                                        <Form.Label>Mobile</Form.Label>
                                        <Form.Control type="text" onChange={(e)=>setMobile(e)} placeholder="Mobile No." />
                                    </Form.Group>
                                    <Button variant="primary" onClick={(e)=>submitHandler(e)} type="submit">
                                        Submit
                                    </Button>
                                </Form>
                            </Col>
                        </Row>
                    </Card.Text>
                </Card.Body>
            </Card>
        </Container>
    </Layout>
}

export default AddUser;