import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom"
import { EditableCard } from "../components/EditableCard";
import { deleteCard, getBoard, moveCard, createOrUpdateCard, getPath, createOrUpdateLane } from "../services/board-api-service";

export const Board = (props) => {
    const {id} = useParams();
    console.log(id);
    const [board, setBoard] = useState({name: 'im bored'});
    const [currentLane, setLane] = useState(null);
    const [sourceVal, setSourceVal] = useState({val: ''});


    useEffect(() => {
        getBoard(id).then((b) => setBoard(b));
    }, [id]);
    const dragEndCallback = (old_idx, c) => {
        const lane = board.lanes[currentLane];
        board.lanes[old_idx].cards = board.lanes[old_idx].cards.filter(x => x.id !== c.id);
        board.lanes[currentLane].cards.push({...c});
        setLane(null);
        moveCard(c, lane.url).then(x => getBoard(id)).then((b) => setBoard(b));
    }

    const dragOverCallback = (id) => {
        console.log(id);
        setLane(id);
    }
    const refreshBoard = async (id) => {
        const newBoard = await getBoard(id);
        await setBoard(newBoard);
    }

    const onDeleteCard = async (lane_idx, url) => {
        await deleteCard(url);
        const lane = board.lanes[lane_idx];
        console.log(lane.cards);
        lane.cards = lane.cards.filter(c => getPath(c.url) !== getPath(url));
        setBoard({...board});
        const newBoard = await getBoard(id);
        await setBoard(newBoard);
    }

    const onUpdateCard = async (newVal, c) => {
        if(newVal.trim() === ''){
            return;
        }
        console.log(newVal);
        const newCard = {...c, description: newVal};
        await createOrUpdateCard(newCard).then(() => refreshBoard(id)).then(() => setSourceVal({val: ''}));
    }

    const newLane = useRef();
    const addNewLane = async () => {
        const val = newLane.current.textContent;
        await createOrUpdateLane(board.id, {name: val, card_set: []});
        await refreshBoard(id);
    }

    return <div className="board">
        <div className="board__title">
            {board.name}
        </div>
        <div className="board__lane-list">
        {board.lanes && board.lanes.map((lane, idx) => (
            <div className="lane" key={`lane_${lane.id}`} onDragOver={() => dragOverCallback(idx)}>
                <div className="lane__title" >
                    {lane.name}
                </div>
                <div className="lane__card-list">
                    {lane.cards && lane.cards.map(c => (<EditableCard draggable="true" onDragEnd={() => dragEndCallback(idx,c)} onDelete={() => onDeleteCard(idx, c.url)} sourceValue={{val: c.description}} onUpdate={(newVal) => onUpdateCard(newVal, c)} ></EditableCard>))}
                    <EditableCard draggable="true" sourceValue={sourceVal} onUpdate={(newVal) => onUpdateCard(newVal, {lane: lane.url})} ></EditableCard>
                </div>
            </div>
        ))}
        </div>
        <div contentEditable="true" ref={newLane}>New Lane</div>
        <button value="+" onClick={addNewLane}>Add new lane</button>

    </div>
}