import React from "react";
import {CatProps} from "../../redux/catSlice";
import styles from './CatBox.module.scss'

const CatBlock: React.FC<CatProps> = ({id, url, width, height}) => {
  return (
    <div className={styles.root}>
      <img
        className={styles.cat_image}
        src={ url }
        alt="cat"
      />
    </div>
  )
}

export default CatBlock