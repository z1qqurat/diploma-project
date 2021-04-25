import React, {useContext, useState, useEffect} from 'react';
import * as Icon from 'react-bootstrap-icons';
import ReactStars from "react-rating-stars-component";
import {
  Row,
  Badge,
  Col,
  Image,
  Accordion,
  Card,
  Table,
  Button,
  Form,
  FormControl,
  FormGroup
} from 'react-bootstrap';
import apiWrapper from '../apiWrapper';
import UserContext from './UserContext';

export const ProfilePage = function() {

    const userCtxt = useContext(UserContext);

    const urlParams = new URLSearchParams(window.location.search);
    const designerIdParam = +urlParams.get('designerId');
    const designerId = designerIdParam || userCtxt.user.id;
    const avatarUrl = userCtxt.user.avatar_url || "https://i.pravatar.cc/300";
    const isCurrentUser = designerId === userCtxt.user.id;

    const [rating, setRating] = useState(0);

    const loadRating = () => {
        apiWrapper.get(`/score/user?userId=${designerId}`)
        .then(response => {
            console.log(`Loaded rating ${response.data} for user ${designerId}`);
            setRating(+response.data);
        })
    }

    const updateRating = (value) => {
        apiWrapper.put(`/score/user`, {
            userId: designerId,
            value: +value
        })
        .then(response => {
            console.log(`Put rating "${value} for user ${designerId}"`);
            loadRating();
        })
    }

    useEffect(() => {
        loadRating();
    }, [designerId]);

    const handleAvatarUpload = e => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append("avatar", file);

        apiWrapper({
                method: 'post',
                url: '/user/avatar',
                data: formData,
                headers: {'Content-Type': 'multipart/form-data' }
            })
            .then(() => {
                window.location.reload();
            })
            
    }

    const [mediaPosts, setMediaPosts] = useState([]);

    const loadMediaPosts = async () => {
        const response = await apiWrapper.get(`/news/all?userId=${designerId}`);
        const posts = response.data;
        console.log('Loaded posts', posts);
        setMediaPosts(posts);
    }

    const handleAddPost = () => {
        const formData = new FormData();
        formData.append("title", document.getElementById('newPostTitle').value);
        formData.append("description", document.getElementById('newPostDesc').value);
        formData.append("mediaFile", document.getElementById('newPostMedia').files[0]);

        apiWrapper({
                method: 'post',
                url: 'news/create',
                data: formData,
                headers: {'Content-Type': 'multipart/form-data' }
            })
            .then(response => {
                console.log('ADDED post', JSON.stringify(response.data));
                loadMediaPosts();
            })
    }

    useEffect(() => {
        loadMediaPosts();
    }, []);

    return <Row style={{ marginTop: 10}}>
                <Col md={1}/>
                <Col md={3}>
                    <Row>
                        <Image
                            className="img-responsive"
                            style={{width: "100%", "objectFit": "cover"}}
                            src={avatarUrl} />

                        {isCurrentUser && 
                            <input type="file" name="avatar" style={{
                                zIndex: 10,
                                position: 'absolute',
                                width: '100%',
                                height: 0,
                                paddingBottom: '100%',
                                top: 0,
                                left: 0,
                                cursor: 'pointer',
                                opacity: 0
                            }} onChange={handleAvatarUpload}/>
                        }
                    </Row>
                    <Row>
                        <ReactStars
                            count={5}
                            value={rating}
                            half={true}
                            key={rating}
                            onChange={value => updateRating(value)}
                            size={24}
                            activeColor="#ffd700"
                        />
                    </Row>
                    <Row style={{ marginTop: 10}}>
                        <div style={{ display: 'flex', justifyContent: 'space-evenly', width: '100%', flexWrap: 'wrap'}}>
                            <Badge variant="success">#design</Badge>
                            <Badge variant="success">#motion</Badge>
                            <Badge variant="success">#anime</Badge>
                            <Badge variant="success">#design</Badge>
                            <Badge variant="success">#motion</Badge>
                            <Badge variant="success">#anime</Badge>
                        </div>
                    </Row>
                    <Row style={{ marginTop: 10}}>
                        <Button block>Редагувати</Button>
                    </Row>
                    <Row style={{ marginTop: 10}}>
                        <Button block>Написати</Button>
                    </Row>
                    <Row style={{ marginTop: 10}}>
                        <Button block>Статистика</Button>
                    </Row>
                </Col>
                <Col md={7} style={{ marginLeft: 20 }}>
                    <Row>
                        <Col md={10}>
                            <h1>
                                {`${userCtxt.user.first_name} ${userCtxt.user.last_name}`}
                            </h1>
                        </Col>
                        <Col md={2}><h5>Online</h5></Col>
                    </Row>
                    <Row style={{ marginTop: 10}}>
                        <Table>
                            <tbody>
                                <tr>
                                    <td>Стиль:</td>
                                    <td>Stopmotion/motion</td>
                                </tr>
                                <tr>
                                    <td>Платформа:</td>
                                    <td>Android/iOS</td>
                                </tr>
                            </tbody>
                        </Table>
                    </Row>
                    <Row style={{ marginTop: 10}}>
                        <Accordion style={{ width: '100%'}}>
                            <Card>
                                <Card.Header style={{ textAlign: 'center'}}>
                                    <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                        Переглянути детальну інформацію
                                    </Accordion.Toggle>
                                </Card.Header>
                                <Accordion.Collapse eventKey="0">
                                    <Card.Body style={{ padding: "10px 0"}}>
                                            <Table>
                                                <tbody>
                                                    <tr>
                                                        <td>Дата народження:</td>
                                                        <td>01.01.1900</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Місто:</td>
                                                        <td>Радехів</td>
                                                    </tr>
                                                </tbody>
                                            </Table>
                                    </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                        </Accordion>
                    </Row>
                    <Row style={{ display: 'flex', justifyContent: 'space-around', marginTop: 10}}>
                        <Card>
                            <Card.Body>
                                <Card.Title>200</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">Колажів</Card.Subtitle>
                            </Card.Body>
                        </Card>
                        <Card>
                            <Card.Body>
                                <Card.Title>400</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">Замовлень</Card.Subtitle>
                            </Card.Body>
                        </Card>
                        <Card>
                            <Card.Body>
                                <Card.Title>{rating}</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">Рейтинг</Card.Subtitle>
                            </Card.Body>
                        </Card>
                    </Row>
                    <hr />
                    <Row>
                        <Form onSubmit={e => { e.preventDefault(); return false }}
                            style={{ marginLeft: 10, width: '100%'}}>
                            <FormGroup>
                                <FormControl
                                    type="text"
                                    id="newPostTitle"
                                    placeholder="Назва допису"
                                    className="mr-sm-2"
                                    style={{ width: '100%'}}/>
                            </FormGroup>
                            <FormGroup>
                                <FormControl
                                    as="textarea"
                                    multiple
                                    id="newPostDesc"
                                    placeholder="Опис"
                                    className="mr-sm-2"
                                    style={{ width: 'calc(100% - 58px)', display: 'inline-block', minHeight: 100}}/>
                                    
                                <Button style={{ marginLeft: 5, position: 'relative', verticalAlign: 'top'}}>
                                    <Icon.Paperclip size={18}/>
                                    {isCurrentUser && 
                                        <input type="file" id="newPostMedia" style={{
                                            zIndex: 10,
                                            position: 'absolute',
                                            width: 40,
                                            height: 40,
                                            top: 0,
                                            left: 0,
                                            cursor: 'pointer',
                                            overflow: 'hidden',
                                            opacity: 0
                                        }}/>
                                    }
                                </Button>
                            </FormGroup>
                            <Button block style={{ marginLeft: 5}}
                                    onClick={handleAddPost}>Додати</Button>
                        </Form>
                    </Row>
                    <hr />
                    {mediaPosts.map( (postData, index) => (
                        <Row style={{ marginTop: 10}} key={postData.id}>
                            <Col md={10}>
                                <Row style={{ color: "#17a2b8" }}>
                                    <h4>{postData.authorFullName}</h4>
                                    <span style={{ marginLeft: 10, paddingTop: 5}}>
                                        {(new Date(postData.creation_date)).toLocaleString()}</span>
                                </Row>
                                <Row><h3>{postData.title}</h3></Row>
                                <Row>
                                    <p>{postData.description}</p>
                                </Row>
                                <Row>
                                    <Image 
                                        className="img-responsive"
                                        style={{width: "100%", "objectFit": "cover"}}
                                        src={postData.url} />
                                </Row>
                                <hr />
                            </Col>
                        </Row>
                    ))}
                </Col>
                <Col md={1}/>
            </Row>;
}

export default ProfilePage;