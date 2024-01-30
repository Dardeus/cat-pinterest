import React, {useEffect} from "react";
import {CatProps, fetchCats} from "../../redux/catSlice";
import {RootState, useAppDispatch} from "../../redux/store";
import {useSelector} from "react-redux";
import CatBlock from "../CatBlock";
import styles from './Home.module.scss'

const Home: React.FC = () => {
  const dispatch = useAppDispatch()
  const {items, status} = useSelector((state: RootState) => state.cats)
  const getPizzas = async () => {
    dispatch(fetchCats(
      'https://api.thecatapi.com/v1/images/search?limit=15&breed_ids=beng&api_key=live_R7fkn57sI3CK07vGDjAoH5gLGGLirfOszbEzP9ofCX4nhFpEV2WjbelFg7KOIfs4'))
  }

  useEffect(() => {
    getPizzas()
  }, [])

  console.log(items)

  return (
    <div className={styles.root}>
      {
        status==="success" && items.map((obj: CatProps) => <CatBlock key={obj.id} {...obj}/>)
      }
    </div>
  )
}

export default Home