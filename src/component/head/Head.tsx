import * as React from 'react';
import searchLogo from "../../assets/img/search.png";
import searchLogo2 from "../../assets/img/search2.png";
import calendarLogo from "../../assets/img/calendar-check.png";
import calendarLogo2 from "../../assets/img/calendar-check2.png";

import styled from "styled-components";
import { useStore } from 'src/store';

export const HeadStyle = styled.div`
  display: flex;
  align-items: center;
  padding: 13px 20px;
  flex: 1;
  font-size: 21px;
  color: #495057;
  height: 60px;

  `;
  export const HeadMenu = styled.div<{isactive:number}>`
  max-width: 200px;
  overflow: hidden;
  border: 1px solid ${props => (props.isactive ? "#82B0F4" :"#C4C4C4")};
  border-radius: 30px;
  margin-right:12px;
  padding: 6px 12px;
  font-size: 14px;
  color: ${props => (props.isactive ? "#3478F6" :"#6D6D6D")};
  display: flex;
  align-items: center;
  cursor: pointer;
  
  span {
    margin-left: 4px;
    max-width: 150px;
    overflow: hidden;
    text-overflow: ellipsis; 
  }
  
  &:last-child {
    margin-right: 0px;
    span {
      margin-left: 0px;
    }
  }
`;
export interface HeadProps {
}


const Head:React.FC = () => {  
  const country = ["대한민국", "중국", "일본", "미국", "북한", "러시아", "프랑스", "영국"];
  const { Popup, Tab, hHeadLine, hDate, hCountry, sHeadLine, sDate, sCountry,
    setPopup } = useStore();
  
  const headMenuClick = () => {
    setPopup(!Popup);
  }

  function formatDate(date:Date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1); // 월은 0부터 시작하므로 +1, 2자리로 패딩
    const day = String(date.getDate()); // 날짜를 2자리로 패딩
  
    return `${year}.${month}.${day}`;
  }

  const isHeadLine = Tab ? hHeadLine.length > 0 : sHeadLine.length > 0;
  const searchImage = isHeadLine ? searchLogo2 : searchLogo;
  const isDate = Tab ? hDate !== null : sDate !== null;
  const dateImage = isDate ? calendarLogo2 : calendarLogo;
  const isCountry = Tab ? hCountry.length > 0 : sCountry.length > 0;

  return (
    <HeadStyle>
      <HeadMenu isactive={isHeadLine ? 1 : 0} onClick={() => {headMenuClick() }}>
        <img src={searchImage} width={"16px"} height={"16px"} />
        <span>{ Tab ? (hHeadLine ? hHeadLine : "전체 헤드라인") : (sHeadLine ? sHeadLine : "전체 헤드라인") }</span>
      </HeadMenu>
      <HeadMenu isactive={isDate ? 1 : 0} onClick={() => {headMenuClick() }}>
        <img src={dateImage} width={"16px"} height={"16px"} />
        <span>{ Tab ? (hDate ? formatDate(hDate) : "전체 날짜") : (sDate ? formatDate(sDate) : "전체 날짜") }</span>
      </HeadMenu>
      <HeadMenu isactive={isCountry ? 1 : 0} onClick={() => {headMenuClick() }}>
        <span>{ Tab ? (hCountry.length ? (hCountry.length-1 ? (`${country[hCountry[0]]} 외 ${hCountry.length-1}개`) : country[hCountry[0]]) : "전체 국가") : 
        (sCountry.length ? (sCountry.length-1 ? (`${country[sCountry[0]]} 외 ${sCountry.length-1}개`) : country[sCountry[0]]) : "전체 국가") }</span>
      </HeadMenu>
    </HeadStyle>
  );
}

export default Head;