import * as React from 'react';
import { useEffect } from 'react';
import { useStore } from 'src/store';
import styled from "styled-components";

export interface CheckBoxProps {
    checked?: boolean;
    text: String;
    id: number; 
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;

}
const CheckboxStyle = styled.div`
    height: 100%; 
    line-height: 35px;
    cursor: pointer;
    
    & > * {
        cursor: pointer;
    }    

    & > input {
        display: none;
    }
`;

const LabelStyle = styled.label<{$flag: number}>`
    padding: 6px 12px;
    border-radius: 30px;
    border:1px solid ${props => (props.$flag ? "#82B0F4" : "#f2f2f2")};
    color: ${props => (props.$flag ? "#fff" : "#6D6D6D")};
    background-color: ${props => (props.$flag ? "#82B0F4" : "#fff")};
`;

const CheckBox: React.FC<CheckBoxProps>= (props:CheckBoxProps) => {
    const { checked, text, id, onChange } = props;

    return (
        <CheckboxStyle>
            <LabelStyle $flag={checked ? 1 : 0} htmlFor={id.toString()}>{text}</LabelStyle>
            <input id={id.toString()} type="checkbox" checked={checked} onChange={(e) => onChange(e)} />
        </CheckboxStyle>
    );
};

export default CheckBox;

export const BasicCheckbox = ({id, text, onChange}: CheckBoxProps) => {
    const [isChecked, setIsChecked] = React.useState<boolean>(false);
  
    const Changehandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(e);
        setIsChecked(e.target.checked);
    };

    const { Popup, Tab, hHeadLine, hDate, hCountry, sHeadLine, sDate, sCountry } = useStore();    

    useEffect(()=> {
        if(Popup){
            if((Tab && hCountry.includes(id)) || (!Tab && sCountry.includes(id))){
                setIsChecked(true);
            }
        } else { // 팝업 닫을때
            setIsChecked(false);
        }
      }, [Popup]);
      
    return (
      <CheckBox key={id} text={text} id={id} checked={isChecked} onChange={Changehandler} />
    );
};