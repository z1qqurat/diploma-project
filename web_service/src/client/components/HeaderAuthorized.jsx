import React from 'react';
import * as Icon from 'react-bootstrap-icons';
import {
  Row,
  Col,
  Nav,
  Navbar,
  NavDropdown,
  Form,
  FormControl,
  Button
} from 'react-bootstrap';import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

export const HeaderAuthorized = function(props) {

    const {hasNewMessages, hasNewNotifications} = props;
    const pathname = window.location.pathname;

    return <Row>
                <Col>
                    <Navbar bg="light" expand="lg">
                        <Navbar.Brand href="/">Курсова Марусі</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="mr-auto">
                                <Nav.Link as={Link} to="/profile" active={pathname === "/profile"}>
                                    Моя сторінка
                                </Nav.Link>
                                <Nav.Link as={Link} to="/news" active={pathname === "/news"}>
                                    Новини</Nav.Link>
                                <Nav.Link as={Link} to="/orders" active={pathname === "/orders"}>
                                    Замовлення</Nav.Link>
                                <Nav.Link as={Link} to="/calendar" active={pathname === "/calendar"}>
                                    Календар
                                </Nav.Link>
                                <Nav.Link as={Link} to="/messages" active={pathname === "/messages"}>
                                    {hasNewMessages ? <Icon.EnvelopeFill size={24} /> : <Icon.Envelope size={24} />}
                                </Nav.Link>
                                <Nav.Link as={Link} to="/messages" active={pathname === "/messages"}>
                                    {hasNewNotifications ? <Icon.BellFill size={24} /> : <Icon.Bell size={24} />}
                                </Nav.Link>
                            </Nav>
                            <Form inline>
                                <FormControl type="text" placeholder="" className="mr-sm-2" />
                                <Button variant="outline-success">Пошук</Button>
                                <Nav>
                                    <NavDropdown title="Мова" id="basic-nav-dropdown-lang">
                                        <NavDropdown.Item href="#action/3.1">UA</NavDropdown.Item>
                                        <NavDropdown.Item href="#action/3.2">EN</NavDropdown.Item>
                                    </NavDropdown>
                                </Nav>
                            </Form>
                        </Navbar.Collapse>
                    </Navbar>
                </Col>
            </Row>;
}

export default HeaderAuthorized;