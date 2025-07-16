import { createGlobalStyle } from 'styled-components';

// 
const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Gotham:wght@400;700&family=Quicksand:wght@400;700&display=swap');

  body {
    margin: 0;
    padding: 0;
    font-family: 'Gotham', 'Quicksand', sans-serif;
    background-color: #FFFFFF;
    color: #000000;
  }

::-webkit-scrollbar {
    width: 12px; /* Overall width of the scrollbar */
}

::-webkit-scrollbar-track {
    background: #f1f1f1; /* Light gray background for the scrollbar track */
    border-radius: 10px; /* Rounded corners */
}

::-webkit-scrollbar-thumb {
    background: #888; /* Gray color for the scrollbar thumb */
    border-radius: 10px; /* Rounded corners */
    width: 8px; /* Adjusted width for the thumb */
    min-height: 20px; /* Ensure a minimum height for usability */
}

::-webkit-scrollbar-thumb:hover {
    background: #555; /* Darker gray when hovering over the scrollbar thumb */
}

`;

export default GlobalStyle;