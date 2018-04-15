import React from "react"
import { render } from "react-dom"
import { Meteor } from "meteor/meteor"


import "../imports/startup/accountsConfig"
import App from "../imports/ui/App"


Meteor.startup(() => {
  render(<App />, document.querySelector("#app"))
})


