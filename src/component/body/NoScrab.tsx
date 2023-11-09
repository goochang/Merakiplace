import * as React from 'react';

interface INoScrabProps {
}

const NoScrab: React.FunctionComponent<INoScrabProps> = (props) => {
  return (
    <>
        <div>
            <span>저장된 스크랩이 없습니다.</span>
        </div>
        <div>
            <span>스크랩 하러 가기</span>
        </div>
    </>
  );
};

export default NoScrab;
