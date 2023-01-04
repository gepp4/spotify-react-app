import {useEffect, useState} from 'react';
import {accessToken, getCurrentUserProfile, logout} from "./spotify";
import {catchErrors} from "./utils";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation
} from 'react-router-dom';
import styled from 'styled-components/macro';
import { GlobalStyle } from './styles';
import Home from "./components/Home"
import { Login, Profile } from './pages';

const StyledLogoutButton = styled.button`
  position: absolute;
  top: var(--spacing-sm);
  right: var(--spacing-md);
  padding: var(--spacing-xs) var(--spacing-sm);
  background-color: rgba(0,0,0,.7);
  color: var(--white);
  font-size: var(--fz-sm);
  font-weight: 700;
  border-radius: var(--border-radius-pill);
  z-index: 10;
  @media (min-width: 768px) {
    right: var(--spacing-lg);
  }
`;

// Scroll to top of page when changing routes
// https://reactrouter.com/web/guides/scroll-restoration/scroll-to-top
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  const [token, setToken] = useState(null);

  useEffect(() => {
    setToken(accessToken);
  }, []);

  return (
    <div className="App">
      <GlobalStyle/>
        {!token ? (
          <Login />
          ) : (
            <>
              <StyledLogoutButton onClick={logout}>Log Out</StyledLogoutButton>
              <Router>
                <ScrollToTop />
                <Routes>
                  <Route path="/top-artists"/>
                  <Route path="/top-tracks"/>
                  <Route path="/playlists/:id/" />
                  <Route path="/playlists" />
                  <Route exact path="/" element={<Profile />} />
                  {/* <Route path="/" element={<Home logout={logout} profile={profile}/>}/>  */}
                </Routes>
              </Router>
            </>
          )}
    </div>
  );
}


export default App;
