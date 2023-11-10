import React, { FC, useRef } from 'react';
import { BodyStyle, PostDate, PostHead, PostInfo, PostStyle, PostSub, PostTitle } from './BodyTs';
import { useStore, useStorePersist } from 'src/store';
import { useInView } from 'react-intersection-observer';

import star from "../../assets/img/star.png";
import star2 from "../../assets/img/star-fill.png";
import NoScrab from './NoScrab';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export interface BodyProps {
  data: {},
}
const Body: FC = () => {

  const { useEffect, useState } = React;
  const [List, setList] = useState<any[]>([]);
  const { Tab, Posts, hPage, sPage, hHeadLine, hDate, hCountry, sHeadLine, sDate, sCountry, ScrabSlice,
    setPageUp, setPostData, resetPostData, setScrab, setScrabSlice } = useStore();
  const Scrabs = useStorePersist(state => state.Scrabs);
  const setScrabsData = useStorePersist(state => state.setScrabsData);
  // const [ScrabSlice, setScrabSlice] = useState<any[]>([]);
  const [ref, inView] = useInView({
    // triggerOnce: false, // 한 번만 트리거하고 그 이후에는 관찰 중지
  });
  const [initialized, setInitialized] = useState(false);
  const checkListENG = ["South Korea", "China", "Japan", "United States", "North Korea", "Russia", "France", "United Kingdom"];

  function ScrabLoad(){
    const arr_length = ScrabSlice.length;
    const slicedScrabs:any[] = Scrabs.slice(0, (sPage*6));
    setScrab(slicedScrabs);
  }
  function ScrabLoadMore(){
    let scrab_arr = [];
    let target_arr = Scrabs; // 대상 배열

    if(sHeadLine){
      scrab_arr = target_arr.filter((scrab) => {
        if (scrab.headline && scrab.headline.main) {
          return scrab.headline.main.includes(sHeadLine);
        }
        return false; 
      });
    }
    if(sDate){
      scrab_arr = target_arr.filter((scrab) => {
        if (scrab.pub_date) {
          const date1 = new Date(scrab.pub_date);
          const date2 = new Date(sDate);
          return (date1.getFullYear() === date2.getFullYear() &&
          date1.getMonth() === date2.getMonth() &&
          date1.getDate() === date2.getDate());
        }
        return false; 
      });
    }

    const arr = (sHeadLine || sDate) ? scrab_arr : Scrabs;
    const arr_length = ScrabSlice.length;
    const slicedScrabs:any[] = arr.slice(arr_length, (sPage * 6));
    // const slicedScrabs:any[] = arr.slice((sPage-1) * 6, (sPage * 6));
    setScrabSlice(slicedScrabs);
  }

  let day = ["일", "월", "화", "수", "목", "금", "토"];
  let dateFormatter = (date: String) => {
    if (!date) return;
    const _date = new Date(date.toString());
    return `${_date.getFullYear()}.${_date.getUTCMonth() + 1}.${_date.getUTCDate()} (${day[_date.getDay()]})`
  }
  
  function padNumber(number:number) {
    const str = number.toString();
    if (str.length === 1) {
      return `0${str}`;       // 일의 자리 숫자일 경우 "0"을 앞에 추가
    }
    return str;
  }

  function PostLoadMore(){
    const page = Tab ? hPage : sPage;
    const headLine = Tab ? hHeadLine : sHeadLine;
    const date = Tab ? hDate : sDate;
    const country:any[] = Tab ? hCountry : sCountry;
    let url = `https://api.nytimes.com/svc/search/v2/articlesearch.json?page=${page+1}`
    if (headLine) {
      url+= `&fq=headline:${headLine.split(" ").join("+")}*`;
    } else {
      url+= "&fq=";
    }

    if (country && country.length) {
      if (headLine) {
        url+= "&";   
      }
      url+= "(";  
      country.forEach((val, index) => {
        if (index > 0) url += " OR ";
        url += `glocations:("${checkListENG[val]}")`;
      });
      url+= ")";  
    }
    if (date) {
      if(country && country.length){
        url+= "&";        
      }
      url += `pub_date:(${date.getFullYear()}-${padNumber(date.getMonth()+1)}-${padNumber(date.getDate())})`;
    }

    url += "&api-key=9vAymAHOJfBxQa85OJzPyu8P7wTkvpPY";

    fetch(url, {
      method: "GET"
    }).then(res => res.json()).then(res => {
      console.log(res.response);
      if (res.response && res.response.docs) {
        setPostData(res.response.docs);
      }
    });
  }

  // nyt search api 호출
  useEffect(() => {
    if (!initialized) {
      fetch('https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=9vAymAHOJfBxQa85OJzPyu8P7wTkvpPY', {
        method: "GET"
      }).then(res => res.json()).then(res => {
        console.log(res.response);
        if (res.response && res.response.docs) {
          resetPostData(res.response.docs);
        }
      });

      
      setInitialized(true);
    }
  }, []);

  useEffect(() => {
    console.log(inView);
    console.log(Scrabs);
    console.log(ScrabSlice);
    if (inView) {
      setPageUp();
      if(Tab){
        PostLoadMore();
      } else {
        ScrabLoadMore();
      }
      
    }
  }, [inView]);
  useEffect(() => {
    if(!Tab) ScrabLoad();
  }, [Tab]);

  const ScrabClick = (e: React.MouseEvent, post: any, index: number, isIn: boolean) => {
    setScrabsData(post);
    if(isIn){
      setScrab(ScrabSlice.filter((scrab: { _id: any; }) => scrab._id !== post._id));
      toast.info("스크랩이 취소되었습니다.", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    } else {
      toast.info("스크랩 되었습니다.", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });

    }
  }

  return (
    <BodyStyle>
      <ToastContainer />
      <div>
        {
          Tab ? (
            Posts && Posts.map((post: any, index: any) => {
              const isInArray = Scrabs.some(scrab =>
                scrab._id === post._id
              );
              const starImg = isInArray ? star2 : star;
              return (post &&
                <PostStyle key={index} ref={index === Posts.length - 1 ? ref : null}>
                  <PostHead>
                    <PostTitle  onClick={()=>{ window.location.href = post.web_url; }}>
                      <span>{post.headline && post.headline.main}</span>
                    </PostTitle>
                    <img onClick={(e) => { ScrabClick(e, post, index, isInArray) }} src={starImg} width={"16px"} height={"16px"} />
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
            ScrabSlice.length ? ScrabSlice.map((post: any, index: any) => {
              const isInArray = ScrabSlice.some(scrab =>
                scrab._id === post._id
              );
              const starImg = isInArray ? star2 : star;
              return (post &&
                <PostStyle key={index} ref={index === ScrabSlice.length - 1 ? ref : null}>
                  <PostHead>
                    <PostTitle  onClick={()=>{ window.location.href = post.web_url; }}>
                      {post.headline && post.headline.main}
                    </PostTitle>
                    <img onClick={(e) => { ScrabClick(e, post, index, isInArray) }} src={starImg} width={"16px"} height={"16px"} />
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