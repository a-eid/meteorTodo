import React, { Component } from "react"
import { Template } from "meteor/templating"
import { Blaze } from "meteor/blaze"

class AccountsUIWrapper extends Component {
  state = {}
  componentDidMount() {
    this.view = Blaze.render(Template.loginButtons, document.querySelector(".accounts"))
  }
  componentWillUnmount() {
    Blaze.remove(this.view)
  }

  render() {
    return <span className="accounts" />
  }
}


export default AccountsUIWrapper