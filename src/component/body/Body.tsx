import React, { FC } from 'react';
import { BodyStyle, PostDate, PostInfo, PostStyle, PostSub, PostTitle } from './BodyTs';
import { useStore } from 'src/store';

export interface BodyProps {
  data: {},
}
const Body:FC = () => {
  
  const { useEffect, useState } = React;
  const [List, setList] = useState<any[]>([]);
  const { Posts, setPostData } = useStore();

  // nyt search api 호출
  useEffect(()=> {
    fetch('https://api.nytimes.com/svc/search/v2/articlesearch.json?q=election&api-key=9vAymAHOJfBxQa85OJzPyu8P7wTkvpPY', {
        method : "GET"   
    }).then(res=>res.json()).then(res=>{
      console.log(res.response);
      setPostData(res.response.docs);
      setList(res.response.docs);
    });              
  }, []);

  let day = ["일","월","화","수","목","금","토"];
  let dateFormatter = (date:String) => {
    const _date = new Date(date.toString());
    return `${_date.getFullYear()}.${_date.getMonth()+1}.${_date.getDate()} (${day[_date.getDay()]})`
  }

  return (
    <BodyStyle>
        <div>
            {List && List.map((post, index) => {
              return ( post && 
                <PostStyle key={index}>
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