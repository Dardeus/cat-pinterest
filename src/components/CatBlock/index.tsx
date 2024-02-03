import React from "react";
import {CatProps} from "../../redux/slices/catSlice";
import styles from './CatBox.module.scss'
import favorite_heart from '../../assets/images/favorite_heart.svg'
import clicked_heart from '../../assets/images/clicked_heart.svg'
import {useAppDispatch} from "../../redux/store";
import {manipulateItem} from "../../redux/slices/favoriteCatSlice";

type CatBlockProps = {
  favCats: CatProps[]
  cat: CatProps
}

const CatBlock: React.FC<CatBlockProps> = ({favCats, cat}) => {
  const dispatch = useAppDispatch()

  return (
    <div className={styles.root}>
      <img
        className={styles.favorite_heart}
        onClick={() => dispatch(manipulateItem(cat))}
        src={ (favCats.find( obj => obj.id === cat.id) && true) || false ? clicked_heart : favorite_heart }
        alt="Favorite heart" />
      <img
        className={styles.cat_image}
        src={ cat.url }
        alt="cat"
      />
    </div>
  )
}

export default CatBlock