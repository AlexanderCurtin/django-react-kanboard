import logo from './logo.svg';
import './App.css';
import { BoardList } from './layout/BoardList';
import { Route, Router, Routes } from 'react-router-dom';
import { Board } from './layout/Board';
import {useAuthentication} from './contexts/AuthContext';
import {CallbackComponent} from './Pages/CallbackComponent'
import { LoginComponent } from './Pages/LoginComponent';

function App() {
  console.log(useAuthentication());
  const {loaded, user} = useAuthentication();
  if(!loaded){
    return <>Loading...</>
  }
  if(!user){
    return (<Routes>
        <Route path="/callback" exact element={<CallbackComponent/>} />
        <Route path="/*" element={<LoginComponent/>}></Route>
      </Routes>)
  }
  return (
    <div className="App">
      <header className="App-header">
        <Routes>
          <Route path="/" element={<BoardList />} />
          <Route path="/boards/:id" element={<Board />} />
        </Routes>

      </header>
    </div>
  );
}

export default App;
