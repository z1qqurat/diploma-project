import React, { Component } from 'react';
import {
    Row, Col
  } from 'react-bootstrap';
import apiWrapper from '../apiWrapper';

export default class CreatePostPage extends Component {

  render() {
    return (
        <Row>
            <Col md={3}/>
            <Col md={6}>
            <form
                method="POST"
                action="/post/create">
                <h3>Додавання поста</h3>
    
                <div className="form-group">
                    <label>Назва</label>
                    <input type="text" name="title" className="form-control" placeholder="" />
                </div>
    
                <div className="form-group">
                    <label>Опис</label>
                    <input type="text" name="description" className="form-control" placeholder="" />
                </div>

                <div class="input-group">
                <div class="input-group-prepend">
                    <span class="input-group-text" id="inputGroupFileAddon01">Upload</span>
                </div>
                    <div class="custom-file">
                        <input type="file" class="custom-file-input" id="inputGroupFile01" />
                        <label class="custom-file-label" for="inputGroupFile01">Вибрати файл</label>
                    </div>
                </div>
    
                <button className="btn btn-info">Назад</button>
                <button type="submit" className="btn btn-primary">Створити</button>
            </form>
            </Col>
            <Col md={3}/>
        </Row>
    );
  }
}
