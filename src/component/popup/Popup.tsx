import React, { FC, useCallback, useEffect, useState } from 'react';
import { useStore, useStorePersist } from 'src/store';
import styled from "styled-components";
import CheckBox, { BasicCheckbox } from './CheckBox';
import { createGlobalStyle } from 'styled-components';

// datepicker
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/esm/locale'; //한국어 설정
import { PopupContent, PopupField, PopupFieldCountry, PopupFieldInput, PopupFieldTitle, PopupFooter, PopupFooterBtn, PopupMain } from './PopupTs';
import PopupInput from './PopupInput';

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

const PopupStyle = styled.div<{$flag: number}>`
  display: ${props => (props.$flag ? "flex" : "none")};
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

  const { Popup, Tab, hHeadLine, hDate, hCountry, sHeadLine, sDate, sCountry, ScrabSlice,
    setPopup, setPostData, setPage, resetPostData, setHeadLine, setDate, setCountry, setScrab } = useStore();
  const Scrabs = useStorePersist(state => state.Scrabs);

  const checkList = ["대한민국", "중국", "일본", "미국", "북한", "러시아", "프랑스", "영국"];
  const checkListENG = ["South Korea", "China", "Japan", "United States", "North Korea", "Russia", "France", "United Kingdom"];
  const [headLine, setHeadLine_] = useState<string>("");
  const [checkItems, setCheckItems] = useState(new Set<number>);
  const [startDate, setStartDate] = useState<Date | null>(null);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const id = Number(e.target.id);
    if (e.target.checked) {
      checkItems.add(id);
    } else {
      checkItems.delete(id);
    }
    setCheckItems(checkItems);
  };

  function padNumber(number:number) {
    const str = number.toString();
    if (str.length === 1) {
      return `0${str}`;       // 일의 자리 숫자일 경우 "0"을 앞에 추가
    }
    return str;
  }

  const headMenuClick = (e: React.MouseEvent) => {
    if (e.target !== e.currentTarget) return;
    setPopup(!Popup);
  }

  const searchPost = () => {
    let url= "https://api.nytimes.com/svc/search/v2/articlesearch.json?page=1"
    if(headLine){
      url+= `&fq=headline:${headLine.split(" ").join("+")}*`;
    } else {
      url+= "&fq=";
    }

    let country_arr:any[];
    if(checkItems && checkItems.size){ 
      if (headLine) {
        url+= "&";   
      }
      country_arr = Array.from(checkItems).sort((a, b) => a - b);
      url+= "(";  
      country_arr.forEach((val, index) => {
        if(index > 0) url += " OR ";
        url+= `glocations:("${checkListENG[val]}")`;
      });
      url+= ")";  
    }
    if(startDate){
      if(checkItems && checkItems.size){ 
        url+= "&";
      }
      url+=`pub_date:(${startDate.getFullYear()}-${padNumber(startDate.getMonth()+1)}-${padNumber(startDate.getDate())})`;
    }
    
    url+="&api-key=9vAymAHOJfBxQa85OJzPyu8P7wTkvpPY";

    fetch(url, {
        method : "GET"   
    }).then(res=>res.json()).then(res=>{
      if(res.response && res.response.docs){
        setPage(1);
        resetPostData(res.response.docs);
        // 헤더
        setHeadLine(headLine ? headLine : "");
        setCountry(checkItems.size ? country_arr : []);
        setDate(startDate ? startDate : null);
        setPopup(false);
      }
    });     
  }
  const searchScrab = () => {
    let scrab_arr = [];
    let target_arr = Scrabs; // 대상 배열
    if(headLine){
      scrab_arr = target_arr.filter((scrab) => {
        if (scrab.headline && scrab.headline.main) {
          return scrab.headline.main.includes(headLine);
        }
        return false; 
      });
      target_arr = scrab_arr;
    }
    if(startDate){
      scrab_arr = target_arr.filter((scrab) => {
        if (scrab.pub_date) {
          const date1 = new Date(scrab.pub_date);
          const date2 = new Date(startDate);
          return (date1.getFullYear() === date2.getFullYear() &&
          date1.getMonth() === date2.getMonth() &&
          date1.getDate() === date2.getDate());
        }
        return false; 
      });
    }
    scrab_arr = scrab_arr.slice(0,6);
    
    let country_arr:any[] = [];
    if(checkItems.size){
      country_arr = Array.from(checkItems).sort((a, b) => a - b);
    }

    // 검색값 없을때
    if(!headLine && !startDate && !checkItems.size && scrab_arr.length == 0){
      scrab_arr = Scrabs.slice(0,6);
    }
    setScrab(scrab_arr);

    setPage(1);
    // 헤더
    setHeadLine(headLine ? headLine : "");
    setCountry(checkItems.size ? country_arr : []);
    setDate(startDate ? startDate : null);
    setPopup(false);
  }

  const SearchBtn = (e:React.MouseEvent<HTMLInputElement>) => {
    if(Tab){
      searchPost();
    } else {
      searchScrab();
    }
  }

  useEffect(()=> {
    if(Popup){ // 팝업 열때
      setHeadLine_(Tab ? hHeadLine : sHeadLine);
      const countrySet: Set<number> | null = new Set<number>(Tab ? hCountry : sCountry);
      if(countrySet !== null){
        setCheckItems(countrySet);
      }
      setStartDate(Tab ? hDate : sDate);
    } else { // 팝업 닫을때
      if(headLine !== ""){
        setHeadLine_("");
      }
      if(checkItems.size){
        setCheckItems(new Set<number>);
      }
      if(startDate){
        setStartDate(null);
      }
    }
  }, [Popup]);

  const handleDateChangeRaw = (e:React.KeyboardEvent<HTMLInputElement>) => {
    e.preventDefault();
  }
  return (
    <PopupStyle $flag={Popup ? 1 : 0} onClick={headMenuClick}>
      <GlobalStyle />
      <PopupMain>
        <PopupContent>
          <PopupField>
            <PopupFieldTitle>헤드라인</PopupFieldTitle>
            <PopupInput headLine={headLine} setHeadLine={setHeadLine_} />
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
              onKeyDown={handleDateChangeRaw} 
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