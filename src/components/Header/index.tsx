import React, {Dispatch, SetStateAction} from "react";
import styles from './Header.module.scss'
import {Tab} from "../../App";

type HeaderProps = {
  activeTab: Tab
  setActiveChapter: Dispatch<SetStateAction<Tab>>
}

const Header: React.FC<HeaderProps> = ({activeTab, setActiveChapter }) => {
  return (
    <div className={styles.root}>
      <button
            className={styles.header_link + (activeTab === "all" ? ' ' + styles.focused : ' ')}
            onClick={()=> setActiveChapter("all")}
      >
        Все котики
      </button>
      <button
            className={styles.header_link + (activeTab === "favorite" ? ' ' + styles.focused : ' ')}
            onClick={()=> setActiveChapter("favorite")}
      >
        Любимые котики
      </button>
    </div>
  )
}

export default Header