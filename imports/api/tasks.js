import { Meteor } from "meteor/meteor"
import { Mongo } from "meteor/mongo"
import { check } from "meteor/check"

export const Tasks = new Mongo.Collection("tasks")

//  detect server or client
if (Meteor.isServer) {
  Meteor.publish("tasks", () => {
    return Tasks.find({
      $or: [{ private: { $ne: true } }, { owner: this.userId }],
    })
  })
}

Meteor.methods({
  "tasks.insert"(text) {
    check(text, String)
    if (!this.userId) {
      throw new Meteor.Error("not-authorized")
    }
    Tasks.insert({
      text,
      createdAt: new Date(),
      owner: this.userId,
      username: Meteor.users.findOne(this.userId).username,
    })
  },
  "tasks.remove"(id) {
    check(id, String)
    Tasks.remove(id)
  },
  "tasks.setchecked"(id, checked) {
    check(id, String)
    check(checked, Boolean)
    Tasks.update(id, { $set: { checked } })
  },
  "tasks.setPrivate"(id, isPrivate) {
    check(id, String)
    check(isPrivate, Boolean)
    const task = Tasks.findOne(id)
    // check ownership.
    if (task.owner != this.userId) {
      throw new Meteor.Error("not-authorized")
    }
    Tasks.update(id, {
      $set: { isPrivate },
    })
  },
})
