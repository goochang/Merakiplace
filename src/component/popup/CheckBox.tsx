import * as React from 'react';
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


const CheckBox: React.FC<CheckBoxProps>= (props:CheckBoxProps) => {
    const { checked, text, id, onChange } = props;
    const LabelStyle = styled.label`
        padding: 6px 12px;
        border-radius: 30px;
        border:1px solid ${checked ? "#82B0F4" : "#f2f2f2"};
        color: ${checked ? "#fff" : "#6D6D6D"};
        background-color: ${checked ? "#82B0F4" : "#fff"};
    `;

    return (
        <CheckboxStyle>
            <LabelStyle htmlFor={id.toString()}>{text}</LabelStyle>
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
    return (
      <CheckBox key={id} text={text} id={id} checked={isChecked} onChange={Changehandler} />
    );
};