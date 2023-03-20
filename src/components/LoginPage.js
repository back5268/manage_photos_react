import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../UserContext';
import './LoginPage.css';

const LoginPage = () => {
    const [ email, setEmail ] = useState('');
    const [ username, setUsername ] = useState('');
    const { setUser } = useContext(UserContext);
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        if ( !username || !email ) {
            alert('Hãy nhập đầy đủ thông tin bắt buộc!')
        } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            alert('Email nhập không hợp lệ!')
        } else {
            fetch('https://jsonplaceholder.typicode.com/users')
            .then(res => res.json())
            .then(data => {
                const user = data.filter(u => u.username === username && u.email === email)[0];
                if (user) {
                    setUser(user);
                    navigate(`/albums/show`);
                } else {
                    alert('Tài khoản hoặc mật khẩu không đúng!');
                };
            });
        };
    };

    return (
        <div className='loginPage'>
            <Form>
                <Form.Group>
                    <Row>
                        <Col xs={3} ><Form.Label>Email (*) </Form.Label></Col>
                        <Col xs={9} ><Form.Control type="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.target.value)} />
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                            </Form.Text>
                        </Col>
                    </Row>
                </Form.Group>
                <Form.Group>
                    <Row className='mt-2'>
                        <Col xs={3} ><Form.Label>Username (*) </Form.Label></Col>
                        <Col xs={9} >
                            <Form.Control type="text" placeholder="Enter username ..." value={username} onChange={e => setUsername(e.target.value)} />
                            <Form.Check type="checkbox" label="Check me out" className='mt-2' />
                            <Button variant="primary" type="submit" className='mt-2' onClick={e => handleLogin(e)} >Submit</Button>
                        </Col>
                    </Row>
                </Form.Group>
            </Form>
        </div>
    );
};

export default LoginPage;