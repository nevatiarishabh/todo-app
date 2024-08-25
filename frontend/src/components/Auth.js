import React, { useState } from 'react';
import axios from 'axios';

function Auth({ setUser }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLogin, setIsLogin] = useState(true);

    const handleAuth = async (e) => {
        e.preventDefault();
        const url = isLogin ? 'http://localhost:5000/login' : 'http://localhost:5000/register';
        try {
            const response = await axios.post(url, { username, password });
            if (isLogin) {
                localStorage.setItem('username', username);
                setUser(username);
            }
            alert(response.data.message || 'Success');
        } catch (error) {
            alert(error.response.data || 'An error occurred');
        }
    };

    return (
        <div>
            <h2>{isLogin ? 'Login' : 'Register'}</h2>
            <form onSubmit={handleAuth}>
                <input 
                    type="text" 
                    placeholder="Username" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                    required 
                />
                <input 
                    type="password" 
                    placeholder="Password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                />
                <button type="submit">{isLogin ? 'Login' : 'Register'}</button>
            </form>
            <button onClick={() => setIsLogin(!isLogin)}>
                {isLogin ? 'Register' : 'Login'}
            </button>
        </div>
    );
}

export default Auth;
