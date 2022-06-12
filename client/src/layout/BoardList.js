import React, {useState, useEffect, useRef, useCallback} from 'react';
import {Link} from 'react-router-dom';
import { EditableCard } from '../components/EditableCard';
import { createBoard, deleteBoard, getBoards } from '../services/board-api-service';
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

    const onDeleteBoard = async (e, id) => {
        e.preventDefault();
        e.stopPropagation();
        console.log(id);
        await deleteBoard(id);
        getBoards().then(b => setBoards(b));
    }

    return <div className="board-list">
        {boards.map(b => (
            <Link key={b.id} to={`/boards/${b.id}`}><EditableCard sourceValue={{val: b.name}} onDelete={(e) => onDeleteBoard(e,b)}></EditableCard></Link>
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

