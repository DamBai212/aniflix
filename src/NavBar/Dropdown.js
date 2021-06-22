import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Dropdown.css";
import getGallery from "../getGallery.js";
// import Anime from "../Anime.js";


export default function Dropdown() {
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);

  return (
    <div>
      <ul
        onClick={handleClick}
        className={click ? "dropdown-menu clicked" : "dropdown-menu"}
      >
        {getGallery().map((prop) => (
          <li key={prop.id}>
              <Link className={prop.cName} to={`/${prop.id}`} onClick={() => setClick(false)}>
                  {prop.name}
              </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
