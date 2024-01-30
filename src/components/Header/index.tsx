import React from "react";
import {Link} from "react-router-dom";
import styles from './Header.module.scss'

const Header: React.FC = () => {
  return (
    <div className={styles.root}>
      <Link to='/' className={styles.header_link}>
        Все котики
      </Link>
      <Link to='/' className={styles.header_link}>
        Любимые котики
      </Link>
    </div>
  )
}

export default Header