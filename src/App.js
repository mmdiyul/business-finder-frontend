import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import './App.css';

class App extends Component {
  render() {
    return (
      <div id="main" className="d-flex flex-column justify-content-center align-items-center">
        <h3>Pilih User</h3>
        <div className="d-flex justify-content-center align-items-center">
          <Link to="/user">
            <button className="btn btn-primary m-2">
              User
            </button>
          </Link>
          <Link to="/admin">
            <button className="btn btn-primary m-2">
              Admin
            </button>
          </Link>
        </div>
      </div>
    )
  }
}

export default App
