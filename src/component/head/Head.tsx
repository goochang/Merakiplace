import * as React from 'react';
import { HeadStyle } from './HeadTs';
import searchLogo from "../../assets/img/search.png"
import calendarLogo from "../../assets/img/calendar-check.png"

export interface HeadProps {
}

export default class Head extends React.Component<HeadProps> {
  public render() {
    return (
        <HeadStyle>
          <div><img src={searchLogo} width={"16px"} height={"16px"} /> 전체 헤드라인</div>
          <div><img src={calendarLogo} width={"16px"} height={"16px"} />전체 날짜</div>
          <div>전체 국가</div>
        </HeadStyle>
    );
  }
}
