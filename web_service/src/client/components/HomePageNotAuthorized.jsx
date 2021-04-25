import React, {useState} from 'react';
import * as Icon from 'react-bootstrap-icons';
import {
  Row,
  Col,
  Image,
  Nav,
  Navbar,
  NavDropdown,
  Form,
  FormControl,
  Button,
  Jumbotron
} from 'react-bootstrap';
import apiWrapper from '../apiWrapper';

export const HomePageNotAuthorized = function() {

    const handleLogin = evt => {
        const form = document.forms.loginForm;
        const email = form['email'].value;
        const password = form['password'].value;

        apiWrapper.post('/auth/login', {
            email, password
        }).then(response => {
            console.log('logged in');
            window.location.reload();
        })

        evt.preventDefault();
        return false;
    }

    const handleRegister = evt => {
        const form = document.forms.registerForm;
        const email = form['email'].value;
        const password = form['password'].value;
        const firstName = form['firstName'].value;
        const lastName = form['lastName'].value;

        apiWrapper.post('/auth/createUser', {
            email, password, firstName, lastName
        }).then(response => {
            console.log('logged in');
            window.location.reload();
        })

        evt.preventDefault();
        return false;
    }

    return <Row style={{ marginTop: 10}}>
                <Col md={1} />
                <Col md={7}>
                    <Jumbotron style={{ backgroundColor: '#f0f0f0'}}>
                        <h1 style={{ color: '#000000'}} >Створи своє портфоліо</h1>
                        <Row style={{ marginTop: 20}}>
                            <Col md={6}>
                                <Image 
                                    className="img-responsive"
                                    style={{width: "100%", "objectFit": "cover"}}
                                    src={"https://image.winudf.com/v2/image1/cmV2ZWwuYXBwLnNjcmVlbm1pcnJvcmluZ19zY3JlZW5fM18xNTQ2NDk5ODY3XzA3OA/screen-3.jpg?fakeurl=1&type=.jpg"} />
                            </Col>
                            <Col md={6}>
                                <Image 
                                    className="img-responsive"
                                    style={{width: "100%", "objectFit": "cover"}}
                                    src={"https://image.winudf.com/v2/image1/cmV2ZWwuYXBwLnNjcmVlbm1pcnJvcmluZ19zY3JlZW5fM18xNTQ2NDk5ODY3XzA3OA/screen-3.jpg?fakeurl=1&type=.jpg"} />
                            </Col>
                        </Row>
                    </Jumbotron>
                </Col>
                <Col md={4}>
                    <Row>
                        <Form
                            name="loginForm"
                            onSubmit={handleLogin}
                            style={{ padding: "20px", width: 300, border: "1px solid black" }}>
                            <h3>Вхід</h3>

                            <div className="form-group">
                                <label>Емейл</label>
                                <input type="email" name="email" className="form-control" placeholder="" />
                            </div>

                            <div className="form-group">
                                <label>Пароль</label>
                                <input type="password" name="password" className="form-control" placeholder="" />
                            </div>

                            <button type="submit" className="btn btn-primary btn-block">Вхід</button>
                        </Form>
                    </Row>
                    <Row style={{ marginTop: 10 }}>
                        <Form
                            name="registerForm"
                            onSubmit={handleRegister}
                            style={{ padding: "20px", width: 300, border: "1px solid black" }}>
                            <h3>Реєстрація</h3>

                            <div className="form-group">
                                <label>Ім'я</label>
                                <input type="text" name="firstName" className="form-control" placeholder="" />
                            </div>

                            <div className="form-group">
                                <label>Прізвище</label>
                                <input type="text" name="lastName" className="form-control" placeholder="" />
                            </div>

                            <div className="form-group">
                                <label>Емейл</label>
                                <input type="email" name="email" className="form-control" placeholder="" />
                            </div>

                            <div className="form-group">
                                <label>Пароль</label>
                                <input type="password" name="password" className="form-control" placeholder="" />
                            </div>

                            <button type="submit" className="btn btn-primary btn-block">Реєстрація</button>
                        </Form>
                    </Row>
                </Col>
                <Col md={1} />
            </Row>;
}

export default HomePageNotAuthorized;