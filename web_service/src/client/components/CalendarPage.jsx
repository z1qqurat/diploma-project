import React, { Component } from 'react';
import {
    Row, Col, Button, Modal, Form
  } from 'react-bootstrap';

import { Calendar, momentLocalizer } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import apiWrapper from '../apiWrapper';

const localizer = momentLocalizer(moment)

const now = new Date()

const myEventsList = [
  {
    id: 15,
    title: 'Point in Time Event',
    start: now,
    end: now,
  }
];

const customMessages = {
    date: 'Дата',
    time: 'Час',
    event: 'Подія',
    allDay: 'Весь день',
    week: 'Тиждень',
    work_week: 'Робочі дні',
    day: 'День',
    month: 'Місяць',
    previous: 'Назад',
    next: 'Вперед',
    yesterday: 'Вчора',
    tomorrow: 'Завтра',
    today: 'Сьогодні',
    agenda: 'Розклад',
  
    noEventsInRange: 'Не знайдено подій у цьому часовому проміжку.',
  
    showMore: total => `+ іще ${total}`
  }

export default class CalendarPage extends Component {

  state = {
    showModal: false,
    fromDate: (new Date()),
    toDate: (new Date()),
    newEventTitle: '',
    myEventsList: []
  }

  loadOrders = async () => {
    const response = await apiWrapper.get('/orders/myOrders');

    const myEventsList = response.data.map(ordr => ({
      id: ordr.id,
      title: ordr.description,
      start: new Date(ordr.from_date),
      end: new Date(ordr.due_date)
    }))

    console.log(`Loaded orders: \n ${JSON.stringify(response.data)}`)

    this.setState({
      myEventsList
    })
  }

  componentDidMount() {
    this.loadOrders();
  }

  render() {

    const handleClose = () => this.setState({ showModal: false});
    const handleSave = async () => {

      await apiWrapper.post('/orders/newOrder', {
        description: this.state.newEventTitle,
        startDate: this.state.fromDate,
        endDate: this.state.toDate
      });

      console.log(`Created order ${JSON.stringify({
        description: this.state.newEventTitle,
        startDate: this.state.fromDate,
        endDate: this.state.toDate
      })}`);

      this.setState({
        showModal: false,
        fromDate: (new Date()),
        toDate: (new Date()),
        newEventTitle: ''
      });

      this.loadOrders();
    };

    return (
        <>
            <Row style={{ marginTop: 25, marginBottom: 25}}>
              <Col md={2}>
                <h3>Календар</h3>
              </Col>
              <Col md={8} />
              <Col md={2}>
                <Button block onClick={() => this.setState({ showModal: true})}>Додати подію</Button>
                <Modal show={this.state.showModal} onHide={handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>Додати подію</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Form>
                      <Form.Group>
                          <Form.Label>Назва</Form.Label>
                          <Form.Control type="text"
                          value={this.state.newEventTitle} onChange={e => this.setState({ newEventTitle: e.target.value })}/>
                      </Form.Group>
                      <Form.Group>
                          <Form.Label>Початок</Form.Label>
                          <br/>
                          <DatePicker showTimeSelect dateFormat="Pp"
                          selected={this.state.fromDate} onChange={v => this.setState({ fromDate: v })}/>
                      </Form.Group>
                      <Form.Group>
                          <Form.Label>Кінець</Form.Label>
                          <br/>
                          <DatePicker showTimeSelect dateFormat="Pp"
                          selected={this.state.toDate} onChange={v => this.setState({ toDate: v })}/>
                      </Form.Group>
                    </Form>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                      Закрити
                    </Button>
                    <Button variant="primary" onClick={handleSave}>
                      Зберегти
                    </Button>
                  </Modal.Footer>
                </Modal>
              </Col>
            </Row>
            <Row style={{ marginTop: 25, marginBottom: 25}}>
            <Calendar
                localizer={localizer}
                events={this.state.myEventsList}
                startAccessor="start"
                endAccessor="end"
                messages={customMessages}
                culture="uk"
                style={{ height: 500, width: '100%', padding: 20 }}
                />
            </Row>
        </>
    );
  }
}
