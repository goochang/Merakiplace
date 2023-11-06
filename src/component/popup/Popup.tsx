import React, { FC, useState } from 'react';
import { useStore } from 'src/store';
import styled from "styled-components";
import CheckBox, { BasicCheckbox } from './CheckBox';
import { createGlobalStyle } from 'styled-components';

// datepicker
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/esm/locale'; //한국어 설정
import { PopupContent, PopupField, PopupFieldCountry, PopupFieldInput, PopupFieldTitle, PopupFooter, PopupFooterBtn, PopupMain, PopupStyle } from './PopupTs';

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
`;
const Popup:FC = () => {  
  
  const { Popup, setPopup } = useStore();

  const checkList = ["대한민국", "중국", "일본", "미국", "북한", "러시아", "프랑스", "영국"];
  const [checkItems, setCheckItems] = useState(new Set<number>);
  const [startDate, setStartDate] =  useState<Date | null>(null);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e);
    const id = Number(e.target.id);
    if(e.target.checked) {
      checkItems.add(id);
    } else {
      checkItems.delete(id);
    }
    setCheckItems(checkItems);
    console.log(checkItems);
  };
  return (
    <PopupStyle>
      <GlobalStyle />
      <PopupMain>
        <PopupContent>
          <PopupField>
            <PopupFieldTitle>헤드라인</PopupFieldTitle>
            <PopupFieldInput id='input1' placeholder='검색하실 헤드라인을 입력해주세요.'  />
          </PopupField>
          <PopupField>
            <PopupFieldTitle>날짜</PopupFieldTitle>
            <StyledDatePicker // DatePicker의 styled-component명
              locale={ko} //한글
              className='datePickerText'
              dateFormat="yyyy.MM.dd"
              selected={startDate}
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
          <PopupFooterBtn>필터 적용하기</PopupFooterBtn>
        </PopupFooter>
      </PopupMain>
    </PopupStyle>
  )
}
export default Popup;