import { useEffect, useRef, useState } from "react"
import {v4 as uuidv4} from 'uuid'
import Todo from "./components/Todo"

function App() {
  const [inputValue, setInputValue] = useState('')
  const [todoList, setTodoList] = useState(()=> JSON.parse(localStorage.getItem('todoList')) || [])
  const [filter, setFilter] = useState('all')
  const [filterButtonSelected, setFilterButtonSelected] = useState(null)

  const allButtonRef = useRef()

  // HANDLE INPUT VALUE
  function handleChange(e){
    setInputValue(e.target.value)
  }

  function addTodo(){
    setTodoList(prevList => {
      return [{id: uuidv4(), value: inputValue, status: 'active'},...prevList]
    })
    setInputValue('')
  }

  function removeTodo(id) {
    setTodoList(prevList => {
      return prevList.filter(item => item.id !== id)
    })
  }

  function toggleStatus(id){
    setTodoList(prevList => {
      return prevList.map(item => {
        if (item.id == id) return {...item, status: item.status == 'complete' ? 'active' : 'complete'}
        return item;
      })
    })
  }

  function getActive(e){
    setFilter('active')
    setFilterButtonSelected(prevSelected => {
      prevSelected.classList.remove('button-selected')
      e.target.classList.add('button-selected')
      return e.target
    })
  }
  function getComplete(e){
    setFilter('complete')
    setFilterButtonSelected(prevSelected => {
      prevSelected.classList.remove('button-selected')
      e.target.classList.add('button-selected')
      return e.target
    })
  }
  function getALl(e){
    setFilter('all')
    setFilterButtonSelected(prevSelected => {
      prevSelected.classList.remove('button-selected')
      e.target.classList.add('button-selected')
      return e.target
    })
  }
  function clearComplete(){
    setTodoList(prevList => {
      return prevList.filter(item => item.status !== 'complete')
    })
  }
  
  const todoListToDisplay = filter == 'all' ? todoList : todoList.filter(item =>  item.status == filter)
  const todoListEl = todoListToDisplay.map((item, index) => {
    return (<Todo key={index} data={{item, toggleStatus, removeTodo} }/>)
  })

  useEffect(()=>{
    if (filterButtonSelected == null) {
      setFilterButtonSelected(allButtonRef.current)
      allButtonRef.current.classList.add('button-selected')
    }
  })

  useEffect(()=>{
    localStorage.setItem('todoList', JSON.stringify(todoList))
  },[todoList])
  
  return (
    <div className="app-wrapper">
      <header> </header>
      <main>
        <h1>TODO</h1>

        <div className="todo-item-container new-todo-container">
          <div className="check-container" onClick={addTodo}></div>
          <input onChange={handleChange} type="text" placeholder="Create a new todo..." value={inputValue} />
        </div>

        <div className="todo-items-container">
            {todoListEl}
        </div>

        <div className="bottom-functionalities todo-items-container">
          <p>{todoListToDisplay.length} items</p>
          <div className="filter-buttons">
            <button ref={allButtonRef} onClick={getALl}>All</button>
            <button onClick={getActive}>Active</button>
            <button onClick={getComplete}>Complete</button>
          </div>
          <button onClick={clearComplete}>Clear completed</button>
        </div>

      </main>
    </div>
  )
}

export default App

/**
 * TODO prototype:
 *  const todo = {
 *    id: uuid
 *    value: teach wilson how to drive a monocycle.
 *    status: active (if first create)
 * }
 * 
 */