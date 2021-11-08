import React, {ChangeEvent, useState} from "react";
import {FilterValuesType} from "./App";
import s from './TodoList.module.css'

export type PropsType = {
    title: string
    tasks: TaskType[]
    removeTask: (id: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (title: string) => void
    changeTaskStatus: (id:string, isDone:boolean) => void
    filter: FilterValuesType
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export function TodoList(props: PropsType) {

    let [title, setTitle] = useState('')

    let [error, setError] = useState<string | null>(null)

    const addTask = () => {
        if(title.trim() !== '') {
            props.addTask(title);
            setTitle('')
        }
        else {
            setError('Title is required')
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    // const onKeyPressHandler = (e: KeyboardEvent) => {
    //     if (e.key === 'Enter') {
    //         addTask()
    //     }
    // }

    const onAllClickHandler = () => {
        props.changeFilter('all')
    }

    const onActiveClickHandler = () => {
        props.changeFilter('active')
    }

    const onCompletedClickHandler = () => {
        props.changeFilter('completed')
    }

    return (
        <div className={s.wrapper}>
            <div>
                <h3 className={s.title}>{props.title}</h3>
                <div>
                    <input value={title}
                           onChange={onChangeHandler}
                           onKeyPress={e => {
                               setError(null)
                               if (e.key === 'Enter') {
                                   addTask()
                               }
                           }}
                    />
                    <button onClick={addTask}>+</button>
                    {error && <div className='error-message'> {error} </div> }
                </div>
                <ul>

                    {props.tasks.map((t) => {
                        const onClickHandler = () => { props.removeTask(t.id)}
                        const onChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
                          let newIsDoneValue = e.currentTarget.checked
                            props.changeTaskStatus(t.id, newIsDoneValue)
                        }
                        
                        return (<li key={t.id} className={t.isDone ? 'is-done' : ''}>
                            <input type="checkbox" checked={t.isDone} onChange={onChangeHandler}/>
                            <span>{t.title}</span>
                            <button onClick={onClickHandler}>x</button>
                        </li>)})
                    }

                    {/*<li><input type="checkbox" checked={props.tasks[0].isDone}/> <span>{props.tasks[0].title}</span></li>*/}
                    {/*<li><input type="checkbox" checked={props.tasks[1].isDone}/> <span>{props.tasks[1].title}</span></li>*/}
                    {/*<li><input type="checkbox" checked={props.tasks[2].isDone}/> <span>{props.tasks[2].title}</span></li>*/}
                </ul>
                <div>
                    <button className={props.filter === 'all' ? 'active-filter' : ''} onClick={onAllClickHandler}>All</button>
                    <button className={props.filter === 'active' ? 'active-filter' : ''} onClick={onActiveClickHandler}>Active</button>
                    <button className={props.filter === 'completed' ? 'active-filter' : ''} onClick={onCompletedClickHandler}>Completed</button>
                </div>
            </div>
        </div>
    )
}