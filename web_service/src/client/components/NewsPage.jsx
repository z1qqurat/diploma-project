import React, { Component } from 'react';
import Post from './Post';
import {
    Row, Col
  } from 'react-bootstrap';
  import apiWrapper from '../apiWrapper';


const DUMMY_POSTS = [
    { 
        avatarUrl: "https://i.imgur.com/I2CTXPT.png",
        userFullName: "Teodor Pukhta",
        title: "Картинка",
        text: "Приклад",
        image: "https://i.imgur.com/TNIypSE.jpg" 
    },
    { 
        avatarUrl: "https://i.imgur.com/I2CTXPT.png",
        userFullName: "Teodor Pukhta",
        title: "Замовлення",
        text: "Арт",
        image: "https://i.imgur.com/Cxd2pgf.png" 
    },
    { 
        avatarUrl: "https://i.pravatar.cc/300",
        userFullName: "Teo Pu",
        title: "Test",
        text: "TestTestTestTestTest",
        image: "https://media.dyvys.info/2017/05/mountains-1366x768-006.jpg" 
    },
    { 
        avatarUrl: "https://i.pravatar.cc/300",
        userFullName: "Te P",
        title: "Tests",
        text: "TestsTestsTestsTestTest",
        image: "https://www.hotel-podgore.com.ua/ua/wp-content/uploads/gori.jpg" 
    },
    { 
        avatarUrl: "https://i.pravatar.cc/300",
        userFullName: "Teo Pu",
        title: "Test",
        text: "TestTestTestTestTest",
        image: "http://ukrainepravo.com/upload/iblock/85b/85bb63e3e0f37c463e8582b9feb677f0.jpg" 
    }
];

export default class NewsPage extends Component {

    state = {
        searchBar: '',
        posts: DUMMY_POSTS
    };

  render() {
    return (
        <>
            <Row style={{ marginTop: 25, marginBottom: 25}}>
                <Col md={3}/>
                <Col md={6}>
                    <div className="input-group input-group-lg">
                        <input type="text" className="form-control input-lg"
                            value={this.state.searchBar} onChange={e => this.setState({ searchBar: e.target.value})}/>
                        <span className="input-group-btn">
                            <button className="btn btn-info btn-lg"
                                onClick={() => this.doSearch()}>
                                Пошук
                                </button>
                        </span>
                    </div>
                </Col>
                <Col md={3}/>
            </Row>
            {this.state.posts.map( (postData, index) => (<Post key={index} {...postData} />))}
        </>
    );
  }

  doSearch() {
    const {searchBar} = this.state;
    const posts = DUMMY_POSTS.filter(p => {
        return p.text.includes(searchBar) || p.title.includes(searchBar) || p.userFullName.includes(searchBar);
    })
    this.setState({ posts: posts});
  }
}
