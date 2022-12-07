import { QueryClient, QueryClientProvider } from 'react-query';

import { createGlobalStyle } from 'styled-components';
import MainPage from './pages/MainPage/MainPage';

const GlobalStyle = createGlobalStyle`
    *, *::before, *::after {
        box-sizing: border-box;
        margin: 0px;
        padding: 0px;
        
        @media screen and (min-width: 500px) {
          font-size: 20px;
        }
    }

    body {
        font-family: "Noto Sans KR", "Helvetica", "Arial", sans-serif;
        line-height: 1.5;
        min-height: 100vh;
        min-height: -webkit-fill-available;
    }
`;

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <GlobalStyle />
        <MainPage />
      </QueryClientProvider>
    </>
  );
}

export default App;
