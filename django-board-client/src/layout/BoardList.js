import React, {useState, useEffect, useRef, useCallback} from 'react';
import {Link} from 'react-router-dom';
import { createBoard, getBoards } from '../services/board-api-service';
export const BoardList =  (props) => {
    const [boards, setBoards] = useState([]);
    const [showForm, setShowForm] = useState(false);
    useEffect(() => {
        getBoards().then(b => setBoards(b))
    }, []);

    const createBoardCallback = useCallback((f) => {
        f.preventDefault();
        const boardName = f.target[0].value;
        createBoard({name: boardName}).then(() => getBoards().then(b => setBoards(b)).then(x => setShowForm(false)));
    }, []);

    return <div className="board-list">
        {boards.map(b => (
            <Link className="board-list__item" key={b.id} to={`/boards/${b.id}`}>{b.name}</Link>
        ))}
        {showForm || (<div className='board-list__item' onClick={() => setShowForm(true)}>+</div>)}
        { showForm &&
        <form class="board-list__form" onSubmit={createBoardCallback}>
            <input name="description" type="text" maxLength={50}></input>
            <input type="submit" value="Create board"></input>
        </form>
        }
    </div>

};

