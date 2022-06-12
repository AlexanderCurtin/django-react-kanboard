const API_BASE = '/api';
const API_ROUTES = {
    BOARDS: '/api/boards',
    LANES: '/api/lanes',
    CARDS: '/api/cards',
};
const getBoards = async () => {
    return await fetch(API_ROUTES.BOARDS).then(x => x.json())
}

const createBoard = async ({name}) => {
    console.log(`gonna create ${name}`)
    return await fetch(API_ROUTES.BOARDS + '/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({name, lane_set: []})
    })
}

const deleteBoard = async({id}) => {
    return await fetch(API_ROUTES.BOARDS + `/${id}/`, {
        method: 'DELETE'
    });
}

const getPath = (url) => {
    const {pathname} = new URL(url);
    return pathname;
}

const getCard = async (url) => {
    const cardPath = getPath(url);
    const {description, id, lane} = await fetch(cardPath).then(x => x.json());
    return {description, id, url, lane};
}

const deleteCard = async (url) => {
    const cardPath = getPath(url);
    await fetch(cardPath, {method: 'DELETE'});
}

const getLane = async (url) => {
    const lanePath = getPath(url);
    const {name, id, card_set} = await fetch(lanePath).then(x => x.json());

    const cards = await Promise.all(card_set.map(c => getCard(c)));

    return {
        name,
        id,
        cards,
        url
    }
}

const getBoard = async (id) => {
    const boardDetail = await fetch(API_ROUTES.BOARDS + `/${id}`).then(x => x.json());
    const lanes = await Promise.all(boardDetail.lane_set?.map(x => getLane(x)));
    return {
        name: boardDetail.name,
        id: boardDetail.id,
        lanes: lanes
    }
}

const moveCard = async(card, laneurl) => {
    await fetch(API_ROUTES.CARDS + `/${card.id}/`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({lane: laneurl, description: card.description})
    })
}

const createOrUpdateCard = async (card) => {
    const isNew = !card.id;
    const route = isNew ? API_ROUTES.CARDS + '/' : getPath(card.url);
    const action = isNew ? 'POST' : 'PUT';
    await fetch(route, {
        method: action,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({...card})
    })
}

const createOrUpdateLane = async (board_id, lane) => {
    const isNew = !lane.id;
    const route = isNew ? API_ROUTES.LANES + '/' : getPath(lane.url);
    const action = isNew ? 'POST' : 'PUT';
    await fetch(route, {
        method: action,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({...lane, board: API_ROUTES.BOARDS + `/${board_id}/`})
    })
}


export {getBoards, createBoard, deleteBoard, getBoard, moveCard, deleteCard, createOrUpdateCard, createOrUpdateLane, getPath}