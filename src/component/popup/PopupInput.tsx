import React, { FC, useCallback, useState } from 'react';
import styled from 'styled-components';

export interface IPopupInputProps {
    // onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    setHeadLine: React.Dispatch<React.SetStateAction<string>>;
    headLine: string;
}

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

const PopupInput:FC<IPopupInputProps> =  (props: IPopupInputProps) => {
    const { headLine, setHeadLine } = props;
    
    const onInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setHeadLine(e.target.value);
      }, [setHeadLine]);
    // string만 체크
    
    return (
        <PopupFieldInput value={headLine} onChange={onInput} id='input1' placeholder='검색하실 헤드라인을 입력해주세요.' />
    );
}


export default PopupInput;