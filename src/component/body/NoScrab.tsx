import * as React from 'react';
import noScrabImg from "../../assets/img/Union.png";
import styled from 'styled-components';
import { useStore } from 'src/store';

interface INoScrabProps {
}
const NoScrabStyle = styled.div`
  margin-top: 30vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  gap: 20px;
`;
const HeadStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #6D6D6D;
  gap: 10px;

  & > span {
    font-weight: 600;
    font-size: 18px;
  }
`;
const FootStyle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 295px;
  height: 60px;
  background-color: #3478F6;
  border-radius: 16px;
  cursor: pointer;
  & > span {
    color: #fff;
    font-weight: 600;
    font-size: 16px;
  }
`;

const NoScrab: React.FunctionComponent<INoScrabProps> = (props) => {
  const { Tab, setTab } = useStore();
    
  return (
    <NoScrabStyle>
      <HeadStyle>
        <img src={noScrabImg} width={"27px"} height={"36px"} />
        <span>저장된 스크랩이 없습니다.</span>
      </HeadStyle>
      <FootStyle onClick={() => { setTab(true)}}>
        <span>스크랩 하러 가기</span>
      </FootStyle>
    </NoScrabStyle>
  );
};

export default NoScrab;
