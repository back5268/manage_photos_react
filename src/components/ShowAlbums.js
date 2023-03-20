import { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../UserContext';
import './ShowAlbums.css';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

const ShowPhoto = ({ children, title, url, id, albumId }) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <div style={{ cursor: 'pointer' }} onClick={handleShow}>
                {children}
            </div>

            <Modal show={show}>
                <Modal.Header closeButton>
                    <Modal.Title>Chi tiết ảnh </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Card>
                        <Card.Img variant="top" src={url} />
                        <Card.Body>
                            <Card.Title>Album {albumId} - Id: {id}</Card.Title>
                            <Card.Text>Title: {title}</Card.Text>
                        </Card.Body>
                    </Card>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

const ShowAlbums = () => {
    const [albums, setAlbums] = useState([]);
    const [currentAlbum, setCurrentAlbum] = useState(1);
    const [photos, setPhotos] = useState([]);
    const [photosData, setPhotosData] = useState([]);
    const { user } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (user.id) {
            fetch('https://jsonplaceholder.typicode.com/albums')
                .then(res => res.json())
                .then(data => {
                    const albums = data.filter(a => a.userId === 1);
                    setAlbums(albums);
                });
        } else {
            navigate('/');
        }
    }, []);

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/photos')
            .then(res => res.json())
            .then(data => {
                const photos = data.filter(p => p.albumId === currentAlbum);
                setPhotos(photos);
                setPhotosData(photos);
            });

    }, [currentAlbum]);

    let showAlbums = document.querySelectorAll('.showAlbum');
    useEffect(() => {
        if (showAlbums[0]) {
            showAlbums.forEach(s => {
                s.addEventListener('click', e => {
                    showAlbums.forEach(s => {
                        s.classList.remove('choose');
                    });
                    e.target.classList.add('choose');
                });
            })
        }
    }, [showAlbums]);

    const handleSearch = (e) => {
        let value = e.target.value;
        console.log(value);
        const photosSearch = photosData.filter(p => p.title.toUpperCase().includes(value.toUpperCase()));
        setPhotos(photosSearch);
    };

    const handleAdd = (e) => {
        e.preventDefault();
        const title = document.querySelector('#title').value;
        const url = document.querySelector('#url').value;
        const thumbnailUrl = document.querySelector('#thumbnailUrl').value;
        if (title == '' || url == '' || thumbnailUrl == '') {
            alert('Vui lòng nhập đầy đủ các thông tin bắt buộc!');
        } else {
            setPhotos([...photos, {
                albumId: currentAlbum,
                id: photosData.length + 1,
                title,
                url,
                thumbnailUrl,
            }]);
            setPhotosData([...photosData, {
                albumId: currentAlbum,
                id: photosData.length + 1,
                title,
                url,
                thumbnailUrl,
            }]);
            alert(`Thêm ảnh vào album ${currentAlbum} thành công!`);
        };
    };

    const handleSort = (e) => {
        let value = e.target.value;
        let sortCriteria;
        switch (value) {
            case '1':
                sortCriteria = (a, b) => a.id - b.id;
                break;
            case '2':
                sortCriteria = (a, b) => b.id - a.id;
                break;
            case '3':
                sortCriteria = (a, b) => a.title.localeCompare(b.title);
                break;
            case '4':
                sortCriteria = (a, b) => b.title.localeCompare(a.title);
                break;
        }
        const photosSort = photos.sort((a, b) => sortCriteria(a, b));
        console.log(photosSort);
        setPhotos(photosSort);
    };

    const AddImg = () => {
        const [show, setShow] = useState(false);
        const handleClose = () => setShow(false);
        const handleShow = () => setShow(true);

        return (
            <>
                <Button variant="info" onClick={handleShow}>
                    Thêm ảnh
                </Button>

                <Modal show={show}>
                    <Modal.Header closeButton>
                        <Modal.Title>Thêm ảnh vào album {currentAlbum}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group>
                                <Row>
                                    <Col xs={4} ><Form.Label>Title (*) </Form.Label></Col>
                                    <Col xs={8} ><Form.Control type="text" placeholder="Enter title" id='title' /></Col>
                                </Row>
                            </Form.Group>
                            <Form.Group>
                                <Row className='mt-2'>
                                    <Col xs={4} ><Form.Label>Url (*) </Form.Label></Col>
                                    <Col xs={8} ><Form.Control type="text" placeholder="Enter url ..." id='url' /></Col>
                                </Row>
                            </Form.Group>
                            <Form.Group>
                                <Row className='mt-2'>
                                    <Col xs={4} ><Form.Label>ThumbnailUrl (*) </Form.Label></Col>
                                    <Col xs={8} ><Form.Control type="text" placeholder="Enter thumbnailUrl ..." id='thumbnailUrl' /></Col>
                                </Row>
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="info" onClick={e => handleAdd(e)} >
                            Thêm ảnh
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    };

    return (
        <div className='showAlbums'>
            <Row>
                <Col xs={2} className='albums'>
                    <div className='showAlbum-title'>Albums</div>
                    {albums.map(a => (
                        <div className='showAlbum' onClick={() => setCurrentAlbum(a.id)} key={a.id} >Album {a.id}</div>
                    ))}
                </Col>
                <Col xs={10}>
                    <div className='header'>
                        <Form.Group>
                            <Row>
                                <Col lg={4}>
                                    <Form.Control type="text" onInput={e => handleSearch(e)} placeholder="Enter title to Search" />
                                </Col>
                                <Col lg={4}>
                                    <Row>
                                        <Col lg={3} ><Form.Label>Sắp xếp</Form.Label></Col>
                                        <Col lg={9} >
                                            <select onChange={e => handleSort(e)}>
                                                <option value='1'>Asc theo Id</option>
                                                <option value='2'>Desc theo Id</option>
                                                <option value='3'>Asc theo tiêu đề</option>
                                                <option value='4'>Desc theo tiêu đề</option>
                                            </select>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col></Col>
                                <Col lg={2}>
                                    <AddImg />
                                </Col>
                            </Row>
                        </Form.Group>
                    </div>
                    <CardGroup>
                        {photos.map(p => (
                            <Col lg={3} sm={4} key={p.id}>
                                <ShowPhoto title={p.title} id={p.id} url={p.url} albumId={p.albumId} >
                                    <Card>
                                        <Card.Img variant="top" src={p.thumbnailUrl} />
                                        <Card.Body>
                                            <Card.Title>Album {p.albumId}</Card.Title>
                                            <Card.Text>{p.title}</Card.Text>
                                        </Card.Body>
                                    </Card>
                                </ShowPhoto>
                            </Col>
                        ))}
                    </CardGroup>
                </Col>
            </Row>
        </div>
    );
};

export default ShowAlbums;