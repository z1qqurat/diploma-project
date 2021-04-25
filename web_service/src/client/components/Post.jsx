import React, { Component } from 'react';
import {
    Row,
    Col,
    Image
  } from 'react-bootstrap';

export default class Post extends Component {

  render() {
    const {
        avatarUrl,
        userFullName,
        title,
        text,
        image
    } = this.props;

    return (
      <>
        <Row style={{ marginTop: 10}}>
            <Col md={1} />
            <Col md={2}>
                <Image
                    className="img-responsive"
                    style={{width: 100, height: 100, borderRadius: 30, float: 'right'}}
                    src={avatarUrl} />
            </Col>
            <Col md={6}>
                <Row style={{ color: "#17a2b8" }}><h4>{userFullName}</h4></Row>
                <Row><h3>{title}</h3></Row>
                <Row>
                    <p>{text}</p>
                </Row>
                <Row>
                    <Image 
                        className="img-responsive"
                        style={{width: "100%", "objectFit": "cover"}}
                        src={image} />
                </Row>
                <hr />
            </Col>
            <Col md={3}></Col>
        </Row>
      </>
    );
  }
}
