import React, { FC } from 'react';
import { BodyStyle } from './BodyTs';
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
        setPostData(res.response.docs);
        setList(res.response.docs);
    });              
  }, []);

  return (
    <BodyStyle>
        <div>
            {List && List.map(_post => {
              return (
                <div>
                    <div>
                      <div>{_post.headline.main}</div>
                    </div>
                    <div>
                    </div>
                </div>
              )
            })}
        </div>
      </BodyStyle>
  )
}
export default Body;