import React, { FC, useRef } from 'react';
import { BodyStyle, PostDate, PostHead, PostInfo, PostStyle, PostSub, PostTitle } from './BodyTs';
import { useStore, useStorePersist } from 'src/store';
import { useInView } from 'react-intersection-observer';

import star from "../../assets/img/star.png";
import star2 from "../../assets/img/star-fill.png";
import NoScrab from './NoScrab';

export interface BodyProps {
  data: {},
}
const Body:FC = () => {
  
  const { useEffect, useState } = React;
  const [List, setList] = useState<any[]>([]);
  const {Tab, Posts, hPage, sPage, setPageUp, setPostData, resetPostData } = useStore();
  const Scrabs = useStorePersist(state => state.Scrabs);
  const setScrabsData = useStorePersist(state => state.setScrabsData);
  const [ref, inView] = useInView({
    // triggerOnce: false, // 한 번만 트리거하고 그 이후에는 관찰 중지
  });
  const [initialized, setInitialized] = useState(false);


  // nyt search api 호출
  useEffect(()=> {
    if (!initialized) {
      fetch('https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=9vAymAHOJfBxQa85OJzPyu8P7wTkvpPY', {
        method : "GET"   
      }).then(res=>res.json()).then(res=>{
        console.log(res.response);
        if(res.response && res.response.docs){
          resetPostData(res.response.docs);
        }
      });              
      setInitialized(true);
    }
    console.log(Posts);

  }, []);

  let day = ["일","월","화","수","목","금","토"];
  let dateFormatter = (date:String) => {
    if(!date) return;
    const _date = new Date(date.toString());
    return `${_date.getFullYear()}.${_date.getUTCMonth()+1}.${_date.getUTCDate()} (${day[_date.getDay()]})`
  }


  useEffect(()=> {
    console.log(inView);
    if(inView){
      setPageUp();
      const page = Tab ? hPage : sPage;
      fetch(`https://api.nytimes.com/svc/search/v2/articlesearch.json?page=${page}&api-key=9vAymAHOJfBxQa85OJzPyu8P7wTkvpPY`, {
          method : "GET"   
      }).then(res=>res.json()).then(res=>{
        console.log(res.response);
        if(res.response && res.response.docs){
          setPostData(res.response.docs);
        }
      });              
    }
    console.log(Posts);
    console.log(Scrabs);

  }, [inView]);

  const ScrabClick = (e: React.MouseEvent, post:any, index:number) => {
    setScrabsData(post);
  }

  return (
    <BodyStyle>
        <div>
          {
            Tab ? (
              Posts && Posts.map((post:any, index:any) => {
                const isInArray = Scrabs.some(scrab => 
                  scrab._id === post._id
                );
                const starImg = isInArray ? star2 : star;
                return ( post && 
                  <PostStyle key={index} ref={index === Posts.length - 1 ? ref : null}>
                    <PostHead>
                      <PostTitle>{post.headline && post.headline.main}</PostTitle>
                      <img onClick={(e) => {ScrabClick(e, post, index)} } src={starImg} width={"16px"} height={"16px"} />
                    </PostHead>
                    <PostSub> 
                      <PostInfo>
                        <span>{post.source}</span>
                        <span>{post.byline && post.byline.original}</span>
                      </PostInfo>
                      <PostDate>{dateFormatter(post.pub_date)}</PostDate>
                    </PostSub>
                  </PostStyle>
                )
              })
            ) : (
              Scrabs.length ? Scrabs.map((post:any, index:any) => {
                const isInArray = Scrabs.some(scrab => 
                  scrab._id === post._id
                );
                const starImg = isInArray ? star2 : star;
                return ( post && 
                  <PostStyle key={index} ref={index === Posts.length - 1 ? ref : null}>
                    <PostHead>
                      <PostTitle>{post.headline && post.headline.main}</PostTitle>
                      <img onClick={(e) => {ScrabClick(e, post, index)} } src={starImg} width={"16px"} height={"16px"} />
                    </PostHead>
                    <PostSub> 
                      <PostInfo>
                        <span>{post.source}</span>
                        <span>{post.byline && post.byline.original}</span>
                      </PostInfo>
                      <PostDate>{dateFormatter(post.pub_date)}</PostDate>
                    </PostSub>
                  </PostStyle>
                )
              }) : <NoScrab />
            )
            
          }
          
        </div>
      </BodyStyle>
  )
}
export default Body;