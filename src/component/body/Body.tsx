import React, { FC, useRef } from 'react';
import { BodyStyle, PostDate, PostInfo, PostStyle, PostSub, PostTitle } from './BodyTs';
import { useStore } from 'src/store';
import { useInView } from 'react-intersection-observer';
export interface BodyProps {
  data: {},
}
const Body:FC = () => {
  
  const { useEffect, useState } = React;
  const [List, setList] = useState<any[]>([]);
  const { Tab, Posts, hPage, sPage, setPageUp, setPostData } = useStore();
  const [ref, inView] = useInView({
    // triggerOnce: false, // 한 번만 트리거하고 그 이후에는 관찰 중지
  });
  const [initialized, setInitialized] = useState(false);


  // nyt search api 호출
  useEffect(()=> {
    if (!initialized) {
      // 글을 불러오는 비동기 작업 수행
      fetch('https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=9vAymAHOJfBxQa85OJzPyu8P7wTkvpPY', {
        method : "GET"   
      }).then(res=>res.json()).then(res=>{
        console.log(res.response);
        if(res.response && res.response.docs){
          setPostData(res.response.docs);
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

  }, [inView]);

  return (
    <BodyStyle>
        <div>
          {
            Posts && Posts.map((post:any, index:any) => {
              return ( post && 
                <PostStyle key={index} ref={index === Posts.length - 1 ? ref : null}>
                  <div>
                    <PostTitle>{post.headline && post.headline.main}</PostTitle>
                  </div>
                  <PostSub> 
                    <PostInfo>
                      <span>{post.source}</span>
                      <span>{post.byline && post.byline.original}</span>
                    </PostInfo>
                    <PostDate>{dateFormatter(post.pub_date)}</PostDate>
                  </PostSub>
                </PostStyle>
              )
            })}
        </div>
      </BodyStyle>
  )
}
export default Body;