import React from 'react'
import Giphy from './components/giphy'
import "./App.css"
import {BrowserRouter as Router,Switch, Route, useHistory} from "react-router-dom"
import Favourites from './components/favourites'

function App() {
  return (
    <Router>
    <div>
      <Route exact path="/" component={Giphy} />
      <Route exact path="/favourites" component={Favourites} />
    </div>
    </Router>
  )
}

//TODO
//1) IMPROVE UI AND USER EXPERIENCE 
//2) IMPROVE RESPONSIVENESS

//FUNCTIONALITIES NOT INTEGRATED
//1) SORTING GIFS BY TIME. CANNOT BE DONE DUE TO FETCHING AND DISPLAYING OF DATA OVER MULTIPLE REQUESTS


export default App