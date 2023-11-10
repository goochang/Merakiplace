import styled from "styled-components";


export const PopupMain = styled.div`
  display: flex;
  justify-content: space-between;

  position: relative;

  width: 520px;
  height: 520px;

  border: 1px solid #011627;
  border-radius: 1em;

  background-color: #FDFFFC;
  flex-direction: column;
  align-items: start;

  color: #011627;
  padding: 20px;
  z-index: 10;
  
  @media (max-width: 560px){
    width: 360px;
  }
`;
export const PopupContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;

  & > div:last-child {
    margin-top: 40px;
  }
`;
export const PopupField = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  margin-bottom: 40px;
  width: 100%;

`;
export const PopupFieldTitle = styled.div`
  font-size:16px;
  font-weight:600;
`;
export const PopupFieldInput = styled.input`
  padding: 10px 20px;
  color: #000;
  font-size: 14px;
  width: 100%;
  border: 1px solid #C4C4C4;
  margin-top: 8px;
  border-radius: 8px;
  height: 44px;

  &::placeholder {
    color: #C4C4C4;
    font-size: 14px;
  }
`;
export const PopupFieldCountry = styled.div`
  display: flex;
  gap: 8px;
  row-gap: 8px;
  flex-wrap: wrap;
  height:34px;
  margin-top: 8px;
  `;
export const PopupFooter = styled.div`
  width: 100%;
  height: 60px;
`;
export const PopupFooterBtn = styled.div`
  background-color: #3478F6;
  color: #fff;
  width: 100%;
  height: 100%;
  text-align: center;
  line-height: 60px;
  border-radius: 16px;
  cursor: pointer;
`;