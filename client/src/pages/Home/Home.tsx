import React, { useEffect } from 'react';
import axios from 'axios';
import * as User from '../../api/user'

function Home() {
    const [responseLogin, setResponseLogin] = React.useState();
    const [responseRegister, setResponseRegister] = React.useState();

    User.login('user2', 'user2').then(response => setResponseLogin(response));

    return ( 
        <div style={ {color: 'white', fontSize: '20px', padding: '20px'} }>
            <h1>This is a test</h1>
            <p>Login status: {responseLogin}</p>
            <p>Register status: {responseRegister}</p>
        </div> 
    );
}

export default Home;