import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

export default function Packs() {
  const [packData, setPackData] = useState([{}]);
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const [user, setUser] = useState()

  useEffect(() => {
    // get packs
    axios
      .get("http://localhost:5000/api/packs")
      .then((res) => res.data)
      .then((res) => {
        setPackData(res);
        console.log(res);
      })
      .catch((err) => console.log(err));
    
    // get user
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
        setUser(data.user)
        setIsLoggedIn(true)
        setIsAdmin(data.user.isAdmin)
      }
    })
    .catch((err) => console.log(err));
  }, []);
  return(
      <div>
          <Navbar user={user} isLoggedIn={isLoggedIn}/>
          {
              isAdmin ?
              <div>
                  <button>Add Pack</button>
              </div>
              :
              ''
          }
          Get all packs from db, when pack is clicked on, go to pack details\n
          contains all cards in pack, option to open a pack
          <br/>
          Packs:
          <br/>
          {JSON.stringify(packData)}
      </div>
  )}