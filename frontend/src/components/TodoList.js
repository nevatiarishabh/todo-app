import React, { useState, useEffect } from 'react';
import axios from 'axios';

function TodoList({ user }) {
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState('');

    useEffect(() => {
        const fetchTodos = async () => {
            const response = await axios.get(`http://localhost:5000/todos/${user}`);
            setTodos(response.data);
        };
        fetchTodos();
    }, [user]);

    const addTodo = async () => {
        const response = await axios.post('http://localhost:5000/todos', { username: user, todo: newTodo });
        setTodos(response.data);
        setNewTodo('');
    };

    const updateTodo = async (index, updatedTodo) => {
        const response = await axios.put(`http://localhost:5000/todos/${user}/${index}`, { todo: updatedTodo });
        setTodos(response.data);
    };

    const deleteTodo = async (index) => {
        const response = await axios.delete(`http://localhost:5000/todos/${user}/${index}`);
        setTodos(response.data);
    };

    return (
        <div>
            <h2>Your ToDos</h2>
            <input 
                type="text" 
                value={newTodo} 
                onChange={(e) => setNewTodo(e.target.value)} 
            />
            <button onClick={addTodo}>Add ToDo</button>
            <ol type="1">
                {todos.map((todo, index) => (
                    <li key={index}>
                        <input 
                            type="text" 
                            value={todo} 
                            onChange={(e) => updateTodo(index, e.target.value)} 
                        />
                        <button onClick={() => deleteTodo(index)}>Delete</button>
                    </li>
                ))}
            </ol>
        </div>
    );
}

export default TodoList;
