import React, { Component } from 'react'
import axios from 'axios'

import PageHeader from '../template/pageHeader'
import TodoForm from './todoForm'
import TodoList from './todoList'

const URL = 'http://localhost:3003/api/todos'

export default class Todo extends Component {
    constructor(props) {
        super(props)

        this.state = {
            description: '',
            liss: []
        }
        this.handleAdd = this.handleAdd.bind(this)
        this.handleChange = this.handleChange.bind(this)
        
        this.handleRemove = this.handleRemove.bind(this)
        this.handleMarkAsDone = this.handleMarkAsDone.bind(this)
        this.handleMarkAsPending = this.handleMarkAsPending.bind(this)

        this.refresh()
    }

    handleAdd() {
        const description = this.state.description
        axios.post(URL, { description } )
            .then(resp => this.refresh())
    }

    handleChange(e) {
        this.setState({ ...this.state, description: e.target.value})
    }

    handleRemove(todo) {
        axios.delete(`${URL}/${todo._id}`)
            .then(resp => this.refresh())
    }

    refresh() {
        axios.get(`${URL}?sort=-createdAt`)
            .then(resp => this.setState({ ...this.state, description: '', list: resp.data}))
    }

    handleMarkAsDone(todo) {
        axios.put(`${URL}/${todo._id}`, { ...todo, done: true})
            .then(resp => this.refresh())
    }

    handleMarkAsPending(todo) {
        axios.put(`${URL}/${todo._id}`, { ...todo, done: false})
            .then(resp => this.refresh())
    }

    render() {
        return (
            <div>
                <PageHeader name='Todo' small='Tarefas'></PageHeader>
                <TodoForm handleAdd={this.handleAdd}
                    handleChange={this.handleChange}
                    description={this.state.description}/>
                <TodoList list={this.state.list}
                    handleRemove={this.handleRemove}
                    handleMarkAsDone={this.handleMarkAsDone}
                    handleMarkAsPending={this.handleMarkAsPending}/>
            </div>
        )
    }
}