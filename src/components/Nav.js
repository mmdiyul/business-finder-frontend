import React, {Component} from 'react';
import {Link} from 'react-router-dom'

class Nav extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-md navbar-dark bg-primary">
        <span className="navbar-brand">Business Finder</span>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
            <li className="nav-item active">
              <Link to="/">
                <span className="text-white">Home</span>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    )
  }
}

export default Nav