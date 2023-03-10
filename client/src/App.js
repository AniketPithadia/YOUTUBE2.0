import { useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import Menu from "./components/Menu";
import Navbar from "./components/Navbar";
import { darkTheme, lightTheme } from "./utils/Theme";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Video from "./pages/Video";
import SignIn from "./pages/SignIn";
import Search from "./pages/Search";
import UpdateUserProfile from "./components/UpdateUserProfile";
import { useSelector } from "react-redux";

const Main = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  position: relative;
  background-color: ${({ theme }) => theme.bg};
  @media (max-width: 500px) {
  }
`;

const Wrapper = styled.div`
  padding: 22px 40px;
  flex: 7;
  @media (max-width: 900px) {
    padding: 22px;
    flex: 3;
  }
`;

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const { currentUser } = useSelector((state) => state.user);

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <BrowserRouter>
        <Navbar />

        <Main>
          <Menu darkMode={darkMode} setDarkMode={setDarkMode} />
          <Wrapper>
            <Routes>
              <Route path="/">
                <Route index element={<Home type="random" />} />
                <Route path="trends" element={<Home type="trend" />} />
                <Route path="subscriptions" element={<Home type="sub" />} />
                <Route path="search" element={<Search />} />
                <Route
                  path="signin"
                  element={currentUser ? <Home /> : <SignIn />}
                />
                <Route path="video">
                  <Route path=":id" element={<Video />} />
                </Route>
              </Route>
            </Routes>
          </Wrapper>
        </Main>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
