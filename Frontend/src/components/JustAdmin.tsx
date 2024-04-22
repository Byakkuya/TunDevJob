import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useAppSelector } from '../shared/store/hook';

interface Props {
    children: React.ReactNode;
}
export const JustAdmin: React.FC<Props> = ({ children }: Props) => {
    const { user } = useAppSelector((state) => state.auth.auth);
       //@ts-ignore
   const role = user.role;
    const navigate = useNavigate();


    useEffect(() => {
        if (role !== 'ADMIN') {
            navigate('/login');
        }
    }, [role, navigate]); // Include isConnected and navigate in the dependency array

    return role ? <>{children}</> : null; // Conditionally render children based on isConnected
};


