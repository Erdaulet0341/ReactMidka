import './App.css';
import Top from "./components/header/Top";
import { Route, Routes } from "react-router-dom";
import HomePage from './components/homePage/HomePage';
import Post from './components/post/Post';
import Account from './components/account/Account';


function App() {
  return (
    <div className="App">
      <Top />
      <div className="container">
        <Routes>
        <Route path="/" element = {<HomePage/>} index={true}/>
          <Route path="/post" element = {<Post/>}/>
          <Route path="/account" element = {<Account/>}/>
        </Routes>
      </div>
    </div>
  );
}

export default App;
