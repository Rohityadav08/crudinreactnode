import { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import React from 'react';
import axios from "axios";
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";
import Layout from "../common/Layout";

const EditUser = ()=>{
    const [user, setUser] = useState({"name": "", "mobile": ""});
    const { userId } = useParams();

    const setName = (e)=>{
        setUser({ "name": e.target.value, "mobile": user.mobile });
    }

    const setMobile = (e)=>{
        setUser({ "name": user.name, "mobile": e.target.value });
    }

    async function submitHandler(e){
        e.preventDefault();
        const formdata = `name=${user.name}&mobile=${user.mobile}&id=${userId}`;
        await editUser(formdata).then((res)=>{
            if(res.modifiedCount > 0){
                alert("Record updated");
            }
        }).catch((er)=>{
            console.log(er);
        });
    }

    useEffect(()=>{
        getUser(userId).then((resp)=>{
            setUser(resp[0]);
        }).catch((error)=>{
            console.log(error);
        });
    }, []);
    return (
        <Layout>
            <Container>
                <Card className="mt-5 offset-3" style={{ width: "35rem" }}>
                    <Card.Body>
                        <Card.Title>Edit User</Card.Title>
                        <Card.Text>
                            <Row>
                                <Col>
                                    <Form>
                                        <Form.Group className="mb-3" controlId="formBasicName">
                                            <Form.Label>Name</Form.Label>
                                            <Form.Control type="text" value={user.name} onChange={(e)=>setName(e)} placeholder="Name" />
                                        </Form.Group>

                                        <Form.Group className="mb-3" controlId="formBasicMobile">
                                            <Form.Label>Mobile</Form.Label>
                                            <Form.Control type="text" value={user.mobile} onChange={(e)=>setMobile(e)} placeholder="Mobile No." />
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
    );
}

const getUser = (id)=>{
    return new Promise((resolve, reject)=>{
        try{
            let formData = `id=${id}`;
            axios({
                method: "post",
                url: "http://localhost:5000/find_user",
                data: formData,
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

const editUser = (formdata)=>{
    return new Promise((resolve, reject)=>{
        try{
            axios({
                method: "put",
                url: "http://localhost:5000/update_user",
                data: formdata,
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

const RedirectTo = (path)=>{
    const navigate = useNavigate();
    navigate(path);
}

export default EditUser;