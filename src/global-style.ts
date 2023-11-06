import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
    * {
        box-sizing: border-box;
    }
    body {
        overflow-x: hidden;
        user-select:none;
    }

    .react-datepicker__triangle {
        display: none;
    }
`;
