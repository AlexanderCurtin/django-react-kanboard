import logo from './logo.svg';
import './App.css';
import { BoardList } from './layout/BoardList';
import { Route, Router, Routes } from 'react-router-dom';
import { Board } from './layout/Board';

function App() {
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
