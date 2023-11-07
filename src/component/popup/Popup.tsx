import React, { FC, useCallback, useState } from 'react';
import { useStore } from 'src/store';
import styled from "styled-components";
import CheckBox, { BasicCheckbox } from './CheckBox';
import { createGlobalStyle } from 'styled-components';

// datepicker
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/esm/locale'; //한국어 설정
import { PopupContent, PopupField, PopupFieldCountry, PopupFieldInput, PopupFieldTitle, PopupFooter, PopupFooterBtn, PopupMain } from './PopupTs';
import PopupInput from './PopupInput';
import { start } from 'repl';

export interface FootProps {
  data: {},
}

const StyledDatePicker = styled(DatePicker)`
  width: 100%;
  height: 48px;
  border: none;
  font-weight: 400;
  font-size: 16px;
  line-height: 100%;
  padding: 10px 20px;
  background-color: transparent;
  position: absolute;
  top: 0px;
  left: 0px;
  border: 1px solid #C4C4C4;
  border-radius: 8px;
`;

const GlobalStyle = createGlobalStyle`
  .react-datepicker-wrapper {
    width: 100%;
  }
  .react-datepicker-popper {
    padding-top: 45px !important;

  }
  .datePickerText {
    &::placeholder {
      color: #C4C4C4;
      font-size: 14px;
    }
  }
`;

const PopupStyle = styled.div<{flag: number}>`
  display: ${props => (props.flag ? "flex" : "none")};
  flex-direction: column;
  justify-content: center;
  align-items: center;
  
  position: fixed;
  width: calc(100vw - (100vw - 100%));
  height:100vh;
  background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7));
  top: 0;
  left: 0;
  z-index: 4;
`;
const Popup: FC = () => {

  const { Popup, setPopup, setPostData, resetPostData } = useStore();

  const checkList = ["대한민국", "중국", "일본", "미국", "북한", "러시아", "프랑스", "영국"];
  const checkListENG = ["South Korea", "China", "Japan", "United States", "North Korea", "Russia", "France", "United Kingdom"];
  const [checkItems, setCheckItems] = useState(new Set<number>);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [headLine, setHeadLine] = useState<string>("");

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e);
    const id = Number(e.target.id);
    if (e.target.checked) {
      checkItems.add(id);
    } else {
      checkItems.delete(id);
    }
    setCheckItems(checkItems);
    console.log(checkItems);
  };

  const headMenuClick = (e: React.MouseEvent) => {
    if (e.target !== e.currentTarget) return;
    setPopup(!Popup);
  }

  const SearchBtn = (e:React.MouseEvent<HTMLInputElement>) => {
    let url= "https://api.nytimes.com/svc/search/v2/articlesearch.json?q="
    if(headLine){
      // url+= "fq=headline:" + headLine.split("").join("+") + "";
      url+= `${headLine.split(" ").join("+")}`;

      if(checkItems || startDate){ url+= "&"; }
    }
    if(checkItems){ 
      url+= "q=&";
      const arr = Array.from(checkItems);
      arr.forEach((val, index) => {
        if(index > 0) url += " OR ";
        url+= `country:${checkListENG[val]}`;
      });
      // if(startDate){ url+= "&"; }
    }
    if(startDate){
      url+=`&fq=pub_date:(${startDate.getFullYear()}-${startDate.getMonth()+1}-${startDate.getDate()})`
    }
    
    url+="&api-key=9vAymAHOJfBxQa85OJzPyu8P7wTkvpPY";

    fetch(url, {
        method : "GET"   
    }).then(res=>res.json()).then(res=>{
      console.log(res.response);
      if(res.response && res.response.docs){
        resetPostData(res.response.docs);
        setPopup(false);
      }
    });              
  }

  return (
    <PopupStyle flag={Popup ? 1 : 0} onClick={headMenuClick}>
      <GlobalStyle />
      <PopupMain>
        <PopupContent>
          <PopupField>
            <PopupFieldTitle>헤드라인</PopupFieldTitle>
            <PopupInput headLine={headLine} setHeadLine={setHeadLine} />
          </PopupField>
          <PopupField>
            <PopupFieldTitle>날짜</PopupFieldTitle>
            <StyledDatePicker // DatePicker의 styled-component명
              locale={ko} //한글
              className='datePickerText'
              dateFormat="yyyy.MM.dd"
              selected={startDate}
              maxDate={new Date}
              placeholderText='날짜를 선택해주세요.'
              closeOnScroll={true} // 스크롤을 움직였을 때 자동으로 닫히도록 설정 기본값 false
              onChange={(date: Date) => setStartDate(date)}
            />
            {/* <PopupFieldInput id='input2' placeholder='날짜를 선택해주세요' /> */}
          </PopupField>
          <PopupField>
            <PopupFieldTitle>국가</PopupFieldTitle>
            <PopupFieldCountry>
              {
                checkList.map((val, i) => {
                  return (
                    <BasicCheckbox key={i}
                      id={i} text={val} onChange={onChange}
                    />
                  )
                })
              }
            </PopupFieldCountry>

          </PopupField>
        </PopupContent>
        <PopupFooter>
          <PopupFooterBtn onClick={SearchBtn}>필터 적용하기</PopupFooterBtn>
        </PopupFooter>
      </PopupMain>
    </PopupStyle>
  )
}
export default Popup;