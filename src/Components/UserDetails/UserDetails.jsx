import React, { useContext } from 'react';
import { userContext } from '../Login/Login';

const UserDetails = () => {
    const user = useContext(userContext);
    
    console.log(user);
    return (
        <div>
            <div className="card mx-auto shadow-lg p-3 mt-5 bg-body-tertiary rounded" style={{width:'30rem'}}>
                    <div className="card-body text-start my-4">
                    <h3 className="fs-4 py-4">Name: {user?.displayName}</h3>
                    <h4 className="fs-5">Email: {user?.email}</h4>
                    </div>
            </div> 
        </div>
    );
};

export default UserDetails;