import React, { Component } from 'react';
import {
  Container,
  Row,
  Col
} from 'react-bootstrap';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import NewsPage from './components/NewsPage';
import HeaderAuthorized from './components/HeaderAuthorized';
import HeaderNotAuthorized from './components/HeaderNotAuthorized';
import HomePageNotAuthorized from './components/HomePageNotAuthorized';
import ProfilePage from './components/ProfilePage';
import OrdersPage from './components/OrdersPage';
import CalendarPage from './components/CalendarPage';
import ChatPage from './components/ChatPage';
import './app.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import apiWrapper from './apiWrapper';
import UserContext from './components/UserContext';


//import ReactImage from './react.png'; //<img src={ReactImage} alt="react" />

export default class App extends Component {
  state = { user: null };

  componentDidMount() {
    apiWrapper.get('/user/currentUser')
    .then(response => {
      console.log(`Current user is: ${JSON.stringify(response.data)}`);
      this.setState({ user: response.data });
    })
  }

  render() {
    const isLoggedIn = !!this.state.user;
    return (
      <UserContext.Provider value={{ user: this.state.user}}>
        <Container fluid>
          <Router>
            {isLoggedIn ? <HeaderAuthorized /> : <HeaderNotAuthorized />}
            <Row>
              <Col>
                {!isLoggedIn && (
                  <Switch>
                    <Route path="*">
                      <HomePageNotAuthorized />
                    </Route>
                  </Switch>
                )}
                {isLoggedIn && (
                  <Switch>
                    <Route path="/profile">
                      <ProfilePage />
                    </Route>
                    <Route path="/news">
                      <NewsPage />
                    </Route>
                    <Route path="/orders">
                      <OrdersPage />
                    </Route>
                    <Route path="/calendar">
                      <CalendarPage />
                    </Route>
                    <Route path="/messages">
                      <ChatPage />
                    </Route>
                    <Route path="*">
                      <ProfilePage />
                    </Route>
                  </Switch>
                )}
              </Col>
            </Row>
          </Router>
        </Container>
      </UserContext.Provider>
    );
  }
}
