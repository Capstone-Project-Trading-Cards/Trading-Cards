import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

export default function Navbar(props) {
  // props contains boolean is user loggedIn, and username
  const navigate = useNavigate();

  function handleLogout() {
    console.log("logout clicked");
    localStorage.removeItem("token");
    navigate("/login");
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
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
                <Link className="nav-link" to="/">
                  Home
                </Link>
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
                <Button variant="contained" type="submit">
                  Search
                </Button>
              </div>
            </form>
          </div>
        </div>
        <div>
          {props.isLoggedIn ? (
            <div>
              {props.user.isAdmin ? (
                <div>
                  <Link className="btn btn-outline-success" to="/addCard">
                    Add Card
                  </Link>
                </div>
              ) : (
                ""
              )}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-around",
                  width: "200px",
                }}
              >
                <Button size="small" variant="contained">
                  {props.user.username}
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  size="small"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </Box>
            </div>
          ) : (
            <Box>
              <Button size="small" variant="contained" href="/login">
                Login
              </Button>
            </Box>
          )}
        </div>
      </div>
    </nav>
  );
}
