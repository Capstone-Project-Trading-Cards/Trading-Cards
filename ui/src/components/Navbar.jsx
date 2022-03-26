import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { styled, alpha } from "@mui/material/styles";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import EditIcon from "@mui/icons-material/Edit";
import Divider from "@mui/material/Divider";
import ArchiveIcon from "@mui/icons-material/Archive";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import PersonIcon from "@mui/icons-material/Person";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import CollectionsIcon from "@mui/icons-material/Collections";
import LogoutIcon from "@mui/icons-material/Logout";
import AddIcon from "@mui/icons-material/Add";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    minWidth: 160,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "0 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 14,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));

export default function Navbar(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  // props contains boolean is user loggedIn, and username
  const navigate = useNavigate();

  function handleLogout() {
    console.log("logout clicked");
    localStorage.removeItem("token");
    navigate("/login");
  }

  function handleGetMoreCoins() {
    navigate("/buyCoins");
  }

  function handleProfile() {
    navigate("/profile");
  }

  return (
    <nav
      style={{ borderBottom: "3px solid #2C3333" }}
      className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top"
    >
      <div className="container">
        <a className="navbar-brand" href="/">
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
              <li className="m-1">
                <Button
                  sx={{ backgroundColor: "#1565C0" }}
                  href="/dashboard"
                  variant="contained"
                >
                  Dashboard
                </Button>
              </li>
              <li className="m-1">
                <Button
                  sx={{ backgroundColor: "#1565C0" }}
                  href="/cards"
                  variant="contained"
                >
                  Cards
                </Button>
              </li>
              <li className="m-1">
                <Button href="/packs" variant="contained">
                  Packs
                </Button>
              </li>
              <li className="m-1">
                <Button href="/" variant="contained">
                  Trades
                </Button>
              </li>
            </ul>
          </div>
          <div className="ml-auto m-1">
            <form className="form-inline my-2 my-lg-0">
              <div className="d-flex m-1">
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
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-around",
                  width: "200px",
                }}
              >
                <Button
                  id="demo-customized-button"
                  variant="contained"
                  onClick={handleClick}
                  endIcon={<KeyboardArrowDownIcon />}
                  size="small"
                >
                  {props.user.username}
                </Button>
                <StyledMenu
                  id="demo-customized-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                >
                  {props.user.isAdmin ? (
                    <>
                      <MenuItem>Admin Dashboard</MenuItem>
                      <MenuItem onClick={() => navigate("/addCard")}>
                        <AddIcon />
                        Add Card
                      </MenuItem>
                      <MenuItem onClick={() => navigate("/addPack")}>
                        <AddIcon />
                        Add Pack
                      </MenuItem>
                      <Divider sx={{ my: 0.5 }} />
                      <MenuItem onClick={handleProfile}>
                        <PersonIcon />
                        Profile
                      </MenuItem>
                      <MenuItem onClick={handleLogout} disableRipple>
                        <LogoutIcon />
                        Logout
                      </MenuItem>
                    </>
                  ) : (
                    <>
                      <MenuItem onClick={handleProfile}>
                        <PersonIcon />
                        Profile
                      </MenuItem>
                      <MenuItem onClick={handleClose} disableRipple>
                        <CollectionsIcon />
                        My Collection
                      </MenuItem>
                      <MenuItem onClick={handleClose} disableRipple>
                        <EditIcon />
                        Trade Requests 1
                      </MenuItem>
                      <Divider sx={{ my: 0.5 }} />
                      <MenuItem disableRipple onClick={handleGetMoreCoins}>
                        <MonetizationOnIcon />
                        Get More Coins
                      </MenuItem>
                      <MenuItem onClick={handleLogout} disableRipple>
                        <LogoutIcon />
                        Logout
                      </MenuItem>
                    </>
                  )}
                </StyledMenu>
                <Typography variant="body1" m={1} sx={{ color: "yellow" }}>
                  <MonetizationOnIcon />
                  {props.user.coinBalance}
                </Typography>
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
