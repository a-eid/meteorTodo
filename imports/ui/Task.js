import React, { Component } from "react"
import { Meteor } from "meteor/meteor"
import { Tasks } from "../api/tasks"

class Task extends Component {
  deleteTask = () => {
    Meteor.call("tasks.remove", this.props.task._id)
  }

  toggleChecked = () => {
    Meteor.call("tasks.setchecked", this.props.task._id, !this.props.task.checked)
  }

  togglePrivate = () => {
    const { _id, isPrivate } = this.props.task
    Meteor.call("tasks.setPrivate", _id, !isPrivate )
  }

  render() {
    let { task, userId } = this.props
    let { text, username } = task
    return (
      <li>
        <button className="delete" onClick={this.deleteTask}>
          &times;
        </button>
        <input type="checkbox" readOnly checked={!!this.props.task.checked} onClick={this.toggleChecked} />
        {task.owner == userId && (
          <button className="toggle-private" onClick={this.togglePrivate}>
            {task.isPrivate ? "Private" : "Public"}
          </button>
        )}
        <span className="text" onClick={this.toggleChecked}>
          {username} - {text}
        </span>
      </li>
    )
  }
}

export default Task
