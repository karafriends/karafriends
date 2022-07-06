import React from "react";
// tslint:disable-next-line:no-submodule-imports
import { FaHistory, FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";

import styles from "./NavBar.module.scss";

const NavBar = () => {
  return (
    <div className={styles.navBar}>
      <Link to="/">
        <FaHome />
      </Link>
      <img height={40} src="/icon.png" alt="空" />
      <Link to="/history">
        <FaHistory />
      </Link>
    </div>
  );
};

export default NavBar;