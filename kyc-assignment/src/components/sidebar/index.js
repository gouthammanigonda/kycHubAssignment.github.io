import { Component } from "react";
import { Link } from "react-router-dom";

import "./index.css";

class Sidebar extends Component {
  render() {
    return (
      <div id="sidebar-wrapper">
        <ul className="sidebar-nav">
          <li className="sidebar-brand">
            <Link to="/">SIDEBAR</Link>
          </li>
          <li>
            <Link to="/">Product Details</Link>
          </li>
          <li>
            <Link to="/compare">Compare Product</Link>
          </li>
        </ul>
      </div>
    );
  }
}

export default Sidebar;
