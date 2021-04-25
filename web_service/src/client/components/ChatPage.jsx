import React, { Component } from 'react';
import {
  Row, Col, Button
} from 'react-bootstrap';
import { ChatList, MessageList, Input } from 'react-chat-elements'
import 'react-chat-elements/dist/main.css';
import styled from 'styled-components'
import apiWrapper from '../apiWrapper';

const ChatWrapper = styled.div`
  width: 100%;
  height: 75vh;
  overflow-y: scroll;
  background-color: #f8f8ff;
`

const CHATS = [
  {
      avatar: 'https://i.pravatar.cc/300',
      alt: ' ',
      title: 'John Wick',
      subtitle: 'What are you doing?',
      date: new Date(),
      unread: 0,
  },
  {
      avatar: 'https://i.pravatar.cc/300',
      alt: ' ',
      title: 'John Wick',
      subtitle: 'What are you doing?',
      date: new Date(),
      unread: 0,
  },
  {
      avatar: 'https://i.pravatar.cc/300',
      alt: ' ',
      title: 'John Wick',
      subtitle: 'What are you doing?',
      date: new Date(),
      unread: 0,
  },
  {
      avatar: 'https://i.pravatar.cc/300',
      alt: ' ',
      title: 'John Wick',
      subtitle: 'What are you doing?',
      date: new Date(),
      unread: 0,
  },
  {
      avatar: 'https://i.pravatar.cc/300',
      alt: ' ',
      title: 'John Wick',
      subtitle: 'What are you doing?',
      date: new Date(),
      unread: 0,
  },
  {
      avatar: 'https://i.pravatar.cc/300',
      alt: ' ',
      title: 'John Wick',
      subtitle: 'What are you doing?',
      date: new Date(),
      unread: 0,
  },
  {
      avatar: 'https://i.pravatar.cc/300',
      alt: ' ',
      title: 'John Wick',
      subtitle: 'What are you doing?',
      date: new Date(),
      unread: 0,
  },
  {
      avatar: 'https://i.pravatar.cc/300',
      alt: ' ',
      title: 'John Wick',
      subtitle: 'What are you doing?',
      date: new Date(),
      unread: 0,
  },
  {
      avatar: 'https://i.pravatar.cc/300',
      alt: ' ',
      title: 'John Wick',
      subtitle: 'What are you doing?',
      date: new Date(),
      unread: 0,
  }
];

const MESSAGES = [
  {
    position: 'right',
    type: 'text',
    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit',
    date: new Date(),
  },{
    position: 'left',
    type: 'text',
    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit',
    date: new Date(),
  },{
    position: 'right',
    type: 'text',
    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit',
    date: new Date(),
  },{
    position: 'left',
    type: 'text',
    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit',
    date: new Date(),
  },{
    position: 'right',
    type: 'text',
    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit',
    date: new Date(),
  },{
    position: 'left',
    type: 'text',
    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit',
    date: new Date(),
  },{
    position: 'right',
    type: 'text',
    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit',
    date: new Date(),
  },{
    position: 'right',
    type: 'text',
    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit',
    date: new Date(),
  },{
    position: 'left',
    type: 'text',
    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit',
    date: new Date(),
  },{
    position: 'right',
    type: 'text',
    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit',
    date: new Date(),
  },{
    position: 'left',
    type: 'text',
    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit',
    date: new Date(),
  },{
    position: 'left',
    type: 'text',
    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit',
    date: new Date(),
  },{
    position: 'right',
    type: 'text',
    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit',
    date: new Date(),
  },{
    position: 'left',
    type: 'text',
    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit',
    date: new Date(),
  },{
    position: 'left',
    type: 'text',
    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit',
    date: new Date(),
  },{
    position: 'left',
    type: 'text',
    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit',
    date: new Date(),
  },{
    position: 'right',
    type: 'text',
    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit',
    date: new Date(),
  },{
    position: 'left',
    type: 'text',
    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit',
    date: new Date(),
  },{
    position: 'right',
    type: 'text',
    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit',
    date: new Date(),
  },{
    position: 'left',
    type: 'text',
    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit',
    date: new Date(),
  },{
    position: 'left',
    type: 'text',
    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit',
    date: new Date(),
  },{
    position: 'right',
    type: 'text',
    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit',
    date: new Date(),
  },{
    position: 'left',
    type: 'text',
    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit',
    date: new Date(),
  },{
    position: 'left',
    type: 'text',
    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit',
    date: new Date(),
  },{
    position: 'right',
    type: 'text',
    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit',
    date: new Date(),
  },{
    position: 'right',
    type: 'text',
    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit',
    date: new Date(),
  },{
    position: 'right',
    type: 'text',
    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit',
    date: new Date(),
  }
]

export default class ChatPage extends Component {

  render() {
    return (
      <Row style={{ marginTop: 25, marginBottom: 25}}>
        <Col md={4}>
          <ChatWrapper>
            <ChatList
              className='chat-list'
              style={{ width: '100%'}}
              dataSource={CHATS} />
          </ChatWrapper>
        </Col>
        <Col md={8}>
          <Row>
            <ChatWrapper>
              <MessageList
                className='message-list'
                lockable={true}
                toBottomHeight={'100%'}
                dataSource={MESSAGES}
                />
            </ChatWrapper>
          </Row>
          <Row>
          <Input
            placeholder="Пишіть тут..."
            rightButtons={
                <Button>Надіслати</Button>
            }/>
          </Row>
        </Col>
      </Row>
    );
  }
}
