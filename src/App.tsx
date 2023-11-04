import React from 'react';
import Head from './component/head/Head';
import Body from './component/body/Body';

import {GlobalStyle} from './global-style';
import { AppStyle } from './AppTs';
import Foot from './component/foot/Foot';

function App() {
  return (
    <>
      <GlobalStyle />
      <AppStyle>
        <div className="App">
          <Head />
          <Body />
          <Foot />
        </div>
      </AppStyle>
    </>
  );
}

export default App;
