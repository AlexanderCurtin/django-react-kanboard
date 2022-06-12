import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { getBoard, moveCard } from "../services/board-api-service";

export const Board = (props) => {
    const {id} = useParams();
    console.log(id);
    const [board, setBoard] = useState({name: 'im bored'});
    const [currentLane, setLane] = useState(null);


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
                    {lane.cards && lane.cards.map(c => (<div className="lane__card" draggable="true" onDragEnd={() => dragEndCallback(idx,c)}>{c.description}</div>))}
                </div>
            </div>
        ))}
        </div>
    </div>
}