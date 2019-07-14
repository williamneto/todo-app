import React, { Component } from 'react'
import PageHeader from '../template/pageHeader'
import TodoForm from './todoForm'
import TodoList from './todoList'

export default class Todo extends Component {
    constructor(props) {
        super(props)

        this.state = {
            description: '',
            liss: []
        }
        this.handleAdd = this.handleAdd.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    handleAdd() {
        console.log(this)
    }

    handleChange(e) {
        this.setState({ ...this.state, description: e.target.value})
        console.log(e.target.value)
    }

    render() {
        return (
            <div>
                <PageHeader name='Todo' small='Tarefas'></PageHeader>
                <TodoForm handleAdd={this.handleAdd}
                    handleChange={this.handleChange}
                    description={this.state.description}/>
                <TodoList />
            </div>
        )
    }
}