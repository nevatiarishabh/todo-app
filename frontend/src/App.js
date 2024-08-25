import React, { useState } from 'react';
import Auth from './components/Auth';
import TodoList from './components/TodoList';
import './App.css';

function App() {
    const [user, setUser] = useState(localStorage.getItem('username'));

    const handleLogout = () => {
        localStorage.removeItem('username');
        setUser(null);
    };

    return (
        <div className="App">
            <nav>
                {user ? (
                    <button onClick={handleLogout}>Logout</button>
                ) : (
                    <>
                        <h1>Welcome to ToDo App</h1>
                    </>
                )}
            </nav>
            <main>
                {user ? <TodoList user={user} /> : <Auth setUser={setUser} />}
            </main>
        </div>
    );
}

export default App;
