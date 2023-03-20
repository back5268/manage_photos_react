import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../UserContext';

const Logout = () => {
    const { setUser, user } = useContext(UserContext);
    const navigate = useNavigate();
    if (user.id) {
        setUser({});
        navigate('/');
    } else {
        navigate('/');
    };
};

export default Logout;