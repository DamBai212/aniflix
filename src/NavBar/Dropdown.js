import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Dropdown.css";
import getGallery from "../getGallery.js";
import Anime from "../Anime.js";

export default function Dropdown() {
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);
  return (
    <div>
      <ul
        onClick={handleClick}
        className={click ? "dropdown-menu clicked" : "dropdown-menu"}
      >
        {getGallery.map((anime) => (
          <li key={anime.id}>
            <Link to="/:animeId" onClick={() => setClick(false)}>
              <Anime id={anime.id} name={anime.name} />
              {anime.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
