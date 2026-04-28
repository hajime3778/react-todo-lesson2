import { useState } from 'react';
import './App.css'
import axios from 'axios'

axios.defaults.baseURL = "http://localhost:4000/api/"

type Todo = {
  id?: number;
  title: string;
  description: string;
};

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);

  const click = async () => {
    const response = await axios.get<Todo[]>("/todos");
    const todos = response.data;
    setTodos(todos);
    console.log(todos);
  }

  return (
    <>
      <h2 className='red'>Test</h2>
      <button onClick={click}>button</button>
      {todos.map((todo: Todo) => 
        <li key={todo.id}>{todo.title}, {todo.description}</li>
      )}
    </>
  )
}

export default App
