import React from 'react';
import * as Icon from 'react-bootstrap-icons';
import {
  Row,
  Col,
  Nav,
  Navbar,
  NavDropdown
} from 'react-bootstrap';

export const HeaderNotAuthorized = function() {

    return <Row>
                <Col>
                    <Navbar bg="light" expand="lg">
                        <Navbar.Brand href="#home">Дипломний проект</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav>
                                <NavDropdown title="Мова" id="basic-nav-dropdown-lang">
                                    <NavDropdown.Item href="#action/3.1">UA</NavDropdown.Item>
                                    <NavDropdown.Item href="#action/3.2">EN</NavDropdown.Item>
                                </NavDropdown>
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>
                </Col>
            </Row>;
}

export default HeaderNotAuthorized;