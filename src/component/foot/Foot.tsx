import React, { FC } from 'react';
import { useStore } from 'src/store';
// import { FootStyle } from './FootTs';
import styled from "styled-components";
import ico_Sheet from "../../assets/img/ico_Sheet.png";
import ico_Sheet_Fill from "../../assets/img/ico_Sheet_Fill.png";
import ico_Home from "../../assets/img/ico_Home.png";
import ico_Home_Fill from "../../assets/img/ico_Home_Fill.png";

export interface FootProps {
  data: {},
}
const Foot:FC = () => {  
  
  const { Tab, setTab } = useStore();

  const FootStyle = styled.div`
    position: fixed;
    bottom: 0;
    background-color: #000;
    height: 85px;
    width: 100%;
    max-width: 560px;
    border-radius: 30px;
    display: flex;
    align-items: center;

    & > div:first-child {
      color: ${Tab ? "#fff" : "#6D6D6D"};
    }
    & > div:last-child {
      color: ${Tab ? "#6D6D6D" : "#fff"};
    }
  `;
  const FootBtn = styled.div`
    text-align: center;
    width: 100%;
    height: 100%;
    font-size:10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 9px;

    & > img {
      line-height: 0px;
    }
  `;

  return (
    <FootStyle>
      <FootBtn onClick={() => setTab(true) }>
        <img src={Tab ? ico_Home_Fill : ico_Home} width={"20px"} height={"22px"} />
        <span>홈</span>
      </FootBtn>
      <FootBtn onClick={() => setTab(false) }>
        <img src={Tab ? ico_Sheet : ico_Sheet_Fill} width={"20px"} height={"22px"} />
        <span>스크랩</span>
      </FootBtn>
    </FootStyle>
  )
}
export default Foot;