import { Component } from "react";

import "./index.css";

class NavBar extends Component {
  render() {
    return (
      <div className="nav">
        <ul>
          <li>
            <p href="/" className="nav-link">
              NAVBAR
            </p>
          </li>
          <li>
            <a href="/" className="nav-link">
              <em>Act Now!</em>
            </a>
          </li>
          <li>
            <a href="/" className="nav-link">
              FAQ
            </a>
          </li>
          <li>
            <a href="/" className="nav-link">
              Contact Us
            </a>
          </li>
        </ul>
      </div>
    );
  }
}

export default NavBar;
