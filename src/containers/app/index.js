import React from 'react'
import { Route, Link } from 'react-router-dom'
import Home from '../home'
import LeaveDetails from '../LeaveDetails'
import ApplyLeave from '../ApplyLeave'


const App = () => (
  <div>
    <main>
      <Route exact path="/" component={Home} />
      <Route exact path="/leave-details" component={LeaveDetails} />
      <Route exact path="/leave-request" component={ApplyLeave} />
    </main>
  </div>
)

export default App
