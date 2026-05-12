import { useEffect, useState } from 'react';
import type { Todo } from './models/Todo'
import './App.css'
import axios from 'axios'

axios.defaults.baseURL = "http://localhost:4000/api/"

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const onLoad = async () => {
    const response = await axios.get<Todo[]>("/todos");
    const todos = response.data;
    setTodos(todos);
  }
  
  useEffect(() => {
    (async () => {
      onLoad()
    })();
  }, [setTodos]);

  const addButtonClick = async () => {
    const todo: Todo = {
      title: title,
      description: description,
    };
    await axios.post<number>("/todos", todo);
    await onLoad();
  }

  const deleteButtonClick = async (id: number) => {
    await axios.delete(`/todos/${id}`);
    await onLoad();
  }; 

  return (
    <>
      <h2 className='red'>Test</h2>

      Title:<input type='text' value={title} onChange={
          (e)=> {setTitle(e.target.value)}
        }></input>
      Description:<input type='text' value={description} onChange={
          (e)=> {setDescription(e.target.value)}
        }></input>
      <button onClick = {addButtonClick}>追加</button>

      {todos.map((todo: Todo) => 
        <li key={todo.id}>
          {todo.title}, {todo.description} <button onClick={() => {
            deleteButtonClick(todo.id!)
          }}>delete</button>
        </li>
      )}
    </>
  )
}

export default App
