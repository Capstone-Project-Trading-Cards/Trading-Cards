import React, {useEffect, useState} from "react";
import axios from "axios";


export default function Navbar() {

  const [user, setUser] = useState()
  const [isLoggedIn, setIsLoggedIn] = useState(false)


  useEffect(() => {
    console.log(localStorage.getItem("token"))
    axios.get("/api/getUsername", {
        headers: {
            "x-access-token": localStorage.getItem("token")
        }
    })
    .then((res) => res.data)
    .then(data => {
      console.log(data)
      console.log(data.isLoggedIn)
      if(data.isLoggedIn) {
        setUser(data.username)
        setIsLoggedIn(true)
      }
    })
    .catch((err) => console.log(err));
  }, [])

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top">
      <div className="container">
        <a className="navbar-brand" href="#">
          Trading Cards Co.
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <div>
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <a className="nav-link" href="#">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Link
                </a>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Dropdown
                </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <a className="dropdown-item" href="#">
                    Action
                  </a>
                  <a className="dropdown-item" href="#">
                    Another action
                  </a>
                  <div className="dropdown-divider"></div>
                  <a className="dropdown-item" href="#">
                    Something else here
                  </a>
                </div>
              </li>
              <li className="nav-item">
                <a className="nav-link disabled" href="#">
                  Disabled
                </a>
              </li>
            </ul>
          </div>
          <div className="ml-auto">
            <form className="form-inline my-2 my-lg-0">
              <div className="d-flex">
                <input
                  className="form-control mr-sm-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                />
                <button
                  className="btn btn-outline-success my-2 my-sm-0"
                  type="submit"
                >
                  Search
                </button>
              </div>
            </form>
          </div>
        </div>
        <div>
          {isLoggedIn ? (
            <div>
              <button>Logout</button>
              {user}
            </div>
            ): (
              <div>
                <button>Login</button>
              </div>
            )
          }
        </div>
      </div>
    </nav>
  );
}
