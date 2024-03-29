import React, {useState} from 'react';
import './App.css';
import {TodoList} from "./TodoList";
import {v1} from "uuid";

export type FilterValuesType = 'all' | 'active' | 'completed'

function App() {

    let [tasks, setTasks] = useState([
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'ReactJS', isDone: false},
        {id: v1(), title: 'RestApi', isDone: false},
        {id: v1(), title: 'GraphQL', isDone: false},
    ])

    function removeTask(id: string) {
        let filteredTasks = tasks.filter((t) => t.id !== id)
        setTasks(filteredTasks)
    }

    let [filter, setFilter] = useState<FilterValuesType>('all')
    let tasksForTodoList = tasks
    if (filter === 'active') {
        tasksForTodoList = tasks.filter((t) => t.isDone === false)
    }
    if (filter === 'completed') {
        tasksForTodoList = tasks.filter((t) => t.isDone === true)
    }

    function changeFilter(value: FilterValuesType) {
        setFilter(value)
    }

    function addTask(title: string) {
        const task = {id: v1(), title: title, isDone: true}
        const newTasks = [task, ...tasks]
        setTasks(newTasks)
    }

    function changeStatus(id:string, isDone:boolean) {
        let task = tasks.find(t => t.id === id)
        if (task) {
            task.isDone = isDone
            setTasks([...tasks])
        }
    }

    return (
        <div className="App">
            <TodoList
                title={'What to learn'}
                tasks={tasksForTodoList}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}
                changeTaskStatus={changeStatus}
                filter={filter}
            />
        </div>
    );
}

export default App;
