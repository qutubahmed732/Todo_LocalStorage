import { useEffect, useState } from "react"
import { TodoProvider } from "./Context/TodoContext"
import { TodoForm, TodoItems } from "./Components/index"

function App() {

  const [todos, setTodos] = useState([
    {id:1, todo: "learn HTML", completed: false},
    {id:2, todo: "learn CSS", completed: false},
    {id:3, todo: "learn JavaScript", completed: false},
  ])

  const addTodo = (todo) => {
    setTodos((prev) => [{ ...todo }, ...prev]);
  }

  const updateTodo = (todo, id) => {
    setTodos((prev) => prev.map((prevTodo) => (prevTodo.id === id ? todo : prevTodo)));
  }

  const deleteTodo = (id) => {
    setTodos(prev => prev.filter(prevTodo => prevTodo.id !== id));
  }

  const toggleComplete = (id) => {
    setTodos(prev => prev.map(prevTodo => prevTodo.id === id ? { ...prevTodo, completed: !prevTodo.completed } : prevTodo));
  }

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"));
    if (todos && todos.length > 0) {
      setTodos(todos)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));

  }, [todos])


  return (
    <TodoProvider value={{ todos, addTodo, updateTodo, toggleComplete, deleteTodo }}>
      <div className="bg-[#172842] min-h-screen py-8 px-5">
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-2xl px-6 py-9 text-white bg-red-600/40">
          <h1 className="text-3xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
          <div className="mb-4">
            {/* Todo form goes here */}
            <TodoForm />
          </div>
          <div className="flex flex-wrap gap-y-3">
            {/*Loop and Add TodoItem here */}
            {
              todos.map((todo) => (
                <div key={todo.id} className="w-full">
                  <TodoItems todo={todo} />
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </TodoProvider>
  )
}

export default App
