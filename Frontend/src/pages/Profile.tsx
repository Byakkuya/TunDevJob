import React from 'react';
import { useAppSelector } from '../shared/store/hook';

import UserCompany from '../components/UserCompany';
import UserDeveloper from '../components/UserDeveloper';
import Loading from '../components/Loading';

const Profile = () => {
    // get the user form the store
    const { user } = useAppSelector((state) => state.auth.auth);

    if (!user) {
        return <Loading />;
    }
    //@ts-ignore
    const role = user.role;
    //@ts-ignore
    const id = user.id;
    //turn the id into a string
    let ids = '';
if (id !== undefined) {
  ids = id.toString();
} 

    const admin = 'ADMIN';
    const developer = 'DEVELOPER';
    const company = 'COMPANY';

    return (
        <div>
            {role === admin && <div>You are an admin</div>}
            {role === developer && <UserDeveloper userId={ids} />}
            {role === company && <UserCompany userId={ids}/>}
        </div>
    );
};

export default Profile;