import React, {useEffect, useRef, useState} from "react";
import {CatProps, fetchCats} from "../../redux/slices/catSlice";
import {RootState, useAppDispatch} from "../../redux/store";
import {useSelector} from "react-redux";
import CatBlock from "../CatBlock";
import styles from './Home.module.scss'
import {Tab} from "../../App";
import {useNavigate} from "react-router-dom";
import qs from "qs"

type HomeProps = {
  activeTab: Tab
}

const Home: React.FC<HomeProps> = ({ activeTab }) => {
  const dispatch = useAppDispatch()
  const {allCats, status} = useSelector((state: RootState) => state.cats)
  const {favCats} = useSelector((state: RootState) => state.favCats)
  const notFirstLoad = useRef(false)
  const [toScroll, setToScroll] = useState(0)
  const navigate = useNavigate()

  const scrollHandler= (e:any) =>{
    const dif = e.target.documentElement.scrollHeight-e.target.documentElement.scrollTop-window.innerHeight
    if(dif<50 && e.target.documentElement.scrollHeight > window.innerHeight)
    {
      window.scrollTo(0, 0);
      getCats()
      setToScroll(e.target.documentElement.scrollHeight - window.innerHeight/2)
    }
  }
  const getCats = async () => {
    dispatch(fetchCats(
      'https://api.thecatapi.com/v1/images/search?limit=15&api_key=live_R7fkn57sI3CK07vGDjAoH5gLGGLirfOszbEzP9ofCX4nhFpEV2WjbelFg7KOIfs4'
    ))
  }

  useEffect(() => {
    if (allCats.length){
      window.scrollTo(0, toScroll);
      console.log(toScroll)
      console.log('setted')
    }
  }, [allCats]);

  useEffect(() => {
    if (notFirstLoad.current) {
      localStorage.setItem("cats", JSON.stringify(favCats))
    }
    notFirstLoad.current = true
  }, [favCats])

  useEffect(() => {
    getCats()
  }, [])

  useEffect(() => {
    if (activeTab !== "all") {
      const queryString = qs.stringify({activeTab})
      navigate(`?${queryString}`)
    }
    else {
      navigate(``)
    }
  }, [activeTab]);

  useEffect(()=>{
    document.addEventListener('scroll',scrollHandler)
    return ()=>{
      document.removeEventListener('scroll',scrollHandler)
    }
  },[])


  return (
    <div className={styles.root}>
      {
        activeTab==="all"
          ? status==="success" && allCats.map((obj: CatProps) => <CatBlock key={obj.id} favCats={favCats} cat={obj}/>)
          : favCats.map((obj: CatProps) => <CatBlock key={obj.id} favCats={favCats} cat={obj}/>)
      }
    </div>
  )
}

export default Home