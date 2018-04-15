import React, { Component } from "react"
import { withTracker } from "meteor/react-meteor-data"
import { Meteor } from "meteor/meteor"
import { Tasks } from "../api/tasks"

// components
import Task from "./Task.js"
import AccountsUiWrapper from "./AccountUiWrapper"

class App extends Component {
  state = {
    value: "",
    hideCompleted: false,
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  resetInput = () => {
    this.setState({
      value: "",
    })
  }

  handleSubmit = e => {
    e.preventDefault()
    const { value } = this.state
    if (value.trim().length < 1) return
    Meteor.call("tasks.insert", value)
    this.resetInput()
  }

  toggleHideCompleted = () => {
    this.setState({
      hideCompleted: !this.state.hideCompleted,
    })
  }

  renderTasks() {
    let userId = this.props.user && this.props.user._id
    if (!userId) return
    console.log(userId, "app.js")
    if (this.state.hideCompleted) {
      return this.props.inCompletedTasks.map(task => <Task key={task._id} task={task} userId={userId} />)
    }
    return this.props.tasks.map(task => <Task key={task._id} task={task} userId={userId} />)
  }

  render() {
    return (
      <div className="container">
        <header>
          <h1>Todo List {this.props.inCompletedCount}</h1>
          <label className="hide-completed">
            <input type="checkbox" readOnly checked={this.state.hideCompleted} onClick={this.toggleHideCompleted} />
            Hide Completed Tasks
          </label>
          <AccountsUiWrapper />
          {this.props.user && (
            <form className="new-task" onSubmit={this.handleSubmit}>
              <input
                autoFocus
                autoComplete="off"
                type="text"
                name="value"
                value={this.state.value}
                onChange={this.handleChange}
              />
            </form>
          )}
        </header>
        <ul>{this.renderTasks()}</ul>
      </div>
    )
  }
}

export default withTracker(() => {
  Meteor.subscribe("tasks")
  return {
    tasks: Tasks.find({}, { sort: { createdAt: -1 } }).fetch(),
    inCompletedCount: Tasks.find({ checked: { $ne: true } }).count(),
    inCompletedTasks: Tasks.find({ checked: { $ne: true } }, { sort: { createdAt: -1 } }).fetch(),
    user: Meteor.user(),
  }
})(App)
