import * as React from 'react';
import searchLogo from "../../assets/img/search.png"
import calendarLogo from "../../assets/img/calendar-check.png"

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
export const HeadMenu = styled.div`
  border: 1px solid #C4C4C4;
  border-radius: 30px;
  margin-right:12px;
  padding: 6px 12px;
  font-size: 14px;
  color: #6D6D6D;
  display: flex;
  align-items: center;

  span {
    margin-left: 4px;
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
  const { Popup, setPopup } = useStore();
  
  const headMenuClick = () => {
    setPopup(!Popup);
  }
  return (
    <HeadStyle>
      <HeadMenu onClick={() => {headMenuClick() }}>
        <img src={searchLogo} width={"16px"} height={"16px"} />
        <span>전체 헤드라인</span>
      </HeadMenu>
      <HeadMenu onClick={() => {headMenuClick() }}>
        <img src={calendarLogo} width={"16px"} height={"16px"} />
        <span>전체 날짜</span>
      </HeadMenu>
      <HeadMenu onClick={() => {headMenuClick() }}>
        <span>전체 국가</span>
      </HeadMenu>
    </HeadStyle>
  );
}

export default Head;