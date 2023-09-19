import "./css/App.css";
import AuthNavigate from "./AuthNavigate";
import Loggedin from "./Loggedin";
import LoginSignup from "./LoginSignup";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Reel from "./pages/Reel";
import Profile from "./pages/Profile";
import Search from "./pages/Search";
import AddPost from "./pages/AddPost";
import Home from "./pages/Home";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route
            exact
            path="/"
            element={
              <AuthNavigate>
                <Loggedin />
              </AuthNavigate>
            }
          />
          <Route
            exact
            path="/HomePage"
            element={
              <AuthNavigate>
                <Loggedin />
              </AuthNavigate>
            }
          >
            <Route  path="home" element={<Home />} />
            <Route  path="search" element={<Search />} />
            <Route  path="post" element={<AddPost />} />
            <Route  path="reel" element={<Reel />} />
            <Route  path="profile" element={<Profile />} />
          </Route>
          <Route exact path="/login" element={<LoginSignup />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
