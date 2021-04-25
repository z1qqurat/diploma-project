import React, { Component } from 'react';
import {
    Row, Col, Tabs, Tab, Form, Button, Image
  } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styled from 'styled-components';
import apiWrapper from '../apiWrapper';

const ItemWrapper = styled.div`
    display: inline-block;
    width: 100%;
    height: 80vh;
    overflow-y: scroll;
    overflow-x: hidden;
    background-color: #f8f9fa;
`;

const Item = styled.div`
  padding: 5px 10px;
  background-color: white;
  margin: 1px 5px 4px 5px;
  border: 1px solid rgba(0,123,255,.25);
  cursor: pointer;
  `

const ITEMS = [1,2,3,4,5,6,7,8,9,10,11,12];

export default class OrdersPage extends Component {

  state = {
      key: 'designers',
      deadline: (new Date())
  }

  render() {
    return (
        <Tabs style={{ marginTop: 10 }} activeKey={this.state.key} onSelect={k => this.setState({ key: k})}>
            <Tab eventKey="designers" title="Знайти дизайнера">
                <Row style={{ marginTop: 10 }}>
                    <Col md={1}/>
                    <Col md={4}>
                        <ItemWrapper>
                            {
                                ITEMS.map(i => (
                                    <Item key={i}>
                                        <Row>
                                            <Col md={4}>
                                                <Image
                                                    className="img-responsive"
                                                    style={{width: 90, height: 90, borderRadius: 45}}
                                                    src="https://i.pravatar.cc/300" />
                                            </Col>
                                            <Col>
                                                <h6>James Bond</h6>
                                                <div>Стиль: motion</div>
                                                <div>Рейтинг: 4.5</div>
                                                <div>Вартість: 500-1000</div>
                                            </Col>
                                        </Row>
                                    </Item>
                                ))
                            }
                        </ItemWrapper>
                    </Col>
                    <Col md={6} style={{ paddingLeft: 20}}>
                        <Row><h3>Пошук дизайнера</h3></Row>
                        <Row>
                            <Form>
                                <Form.Group>
                                    <Form.Label>Стиль роботи</Form.Label>
                                    <Form.Control as="select">
                                        <option>колаж</option>
                                        <option>stop motion</option>
                                        <option>motion</option>
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Платформа</Form.Label>
                                    <Form.Control as="select">
                                        <option>Android</option>
                                        <option>iOS</option>
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Рейтинг</Form.Label>
                                    <Form.Control as="select">
                                        <option>5-4.5</option>
                                        <option>4.5-4</option>
                                        <option>4-3.5</option>
                                        <option>3.5-3</option>
                                        <option>3-2.5</option>
                                        <option>&lt;2.5</option>
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Кількість виконаних замовлень</Form.Label>
                                    <Form.Control as="select">
                                        <option>1-10</option>
                                        <option>10-50</option>
                                        <option>50-100</option>
                                        <option>100+</option>
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Вартість колажу</Form.Label>
                                    <Form.Control as="select">
                                        <option>1-5</option>
                                        <option>5-20</option>
                                        <option>20+</option>
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Вартість ролика</Form.Label>
                                    <Form.Control as="select">
                                        <option>1-5</option>
                                        <option>5-100</option>
                                        <option>100+</option>
                                    </Form.Control>
                                </Form.Group>
                                <Button variant="primary" type="submit">
                                    Пошук
                                </Button>
                            </Form>
                        </Row>
                    </Col>
                    <Col md={1}/>
                </Row>
            </Tab>
            <Tab eventKey="orders" title="Замовлення">
                <Row style={{ marginTop: 10 }}>
                    <Col md={1}/>
                    <Col md={4}>
                        <ItemWrapper>
                            {
                                ITEMS.map(i => (
                                    <Item key={i}>
                                        <Row>
                                            <Col md={4}>
                                                <Image
                                                    className="img-responsive"
                                                    style={{width: 90, height: 90, borderRadius: 45}}
                                                    src="https://i.pravatar.cc/300" />
                                            </Col>
                                            <Col>
                                                <h6>James Bond</h6>
                                                <div>Стиль: motion</div>
                                                <div>Рейтинг: 4.5</div>
                                                <div>Вартість: 500-1000</div>
                                            </Col>
                                        </Row>
                                    </Item>
                                ))
                            }
                        </ItemWrapper>
                    </Col>
                    <Col md={6} style={{ paddingLeft: 20}}>
                        <Row><h3>Замовлення</h3></Row>
                        <Row>
                            <Form>
                                <Form.Group>
                                    <Form.Label>Стиль роботи</Form.Label>
                                    <Form.Control as="select">
                                        <option>колаж</option>
                                        <option>stop motion</option>
                                        <option>motion</option>
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Платформа</Form.Label>
                                    <Form.Control as="select">
                                        <option>Android</option>
                                        <option>iOS</option>
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Дедлайн</Form.Label>
                                    <br/>
                                    <DatePicker selected={this.state.deadline} onChange={v => this.setState({ deadline: v })}/>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Вартість</Form.Label>
                                    <Form.Control type="text"/>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Пропозиція</Form.Label>
                                    <Form.Control as="select">
                                        <option>комерційна</option>
                                        <option>особиста</option>
                                    </Form.Control>
                                </Form.Group>
                                <Button variant="primary" type="submit">
                                    Пошук
                                </Button>
                            </Form>
                        </Row>
                    </Col>
                    <Col md={1}/>
                </Row>
            </Tab>
        </Tabs>
    );
  }
}
