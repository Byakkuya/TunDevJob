import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useAppSelector } from '../shared/store/hook';

interface Props {
    children: React.ReactNode;
}

const PrivateRoute: React.FC<Props> = ({ children }: Props) => {
    const {isAuthenticated} = useAppSelector((state) => state.auth.auth);
    const navigate = useNavigate();


    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login');
        }
    }, [isAuthenticated, navigate]); // Include isConnected and navigate in the dependency array

    return isAuthenticated ? <>{children}</> : null; // Conditionally render children based on isConnected
};

export default PrivateRoute;
