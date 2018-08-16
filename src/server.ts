import {createServer, IncomingMessage, ServerResponse} from 'http';
import {parse} from 'url';

import {store, initialiseGameState} from './state';
import UserError from './util/UserError';
import {proTip} from './util/proTip'
import {NEW_SCREEN} from './util/helpers'
import './util/colors';
const PORT = 8000 || process.env.port;

enum validMethods {
    create = 'create',
    join   = 'join',
    move   = 'move',
    attack = 'attack'
}
const handleRequest = (req: IncomingMessage, res: ServerResponse): any => {
    const url = parse(req.url, true);
    const splitPath = url.pathname.slice(1).split('/');
    const method = splitPath.shift();
    switch (method) {
        case validMethods.create:
            createGameHandler(req, res);
            break;
        case validMethods.join:
            joinGameHandler(req, res);
        case validMethods.move:
        case validMethods.attack:
        default:
            throw new UserError(`Unknown method "${method}".`);
    }
}

createServer((req, res) => {
    try {
        handleRequest(req, res);
    } catch (e) {
        if (e instanceof UserError) {
            res.writeHead(400)
            res.end(`Invalid request ${e.message}\n`);
            return;
        } else {
            res.writeHead(500);
            res.end(e.message);
        }
    }
}).listen(PORT);
console.log(`listening on port ${PORT}`);

/**
 * Player 1 creates a game
 */
const parseCreateGame = (req): string => {
    const url = parse(req.url, true);
    const match = url.pathname.match(/\/create\/([^\/]+)/);
    if (match === null) throw new UserError('Unknown game name.  Try /create/<game-name>');
    return match[1];
}
const createGameHandler = async (req: IncomingMessage, res: ServerResponse) => {
    // Can we start a new game?
    const gameName = parseCreateGame(req);
    if (Object.keys(store).length > 100) throw new UserError('Too many concurrent games, try again later.');
    if (store[gameName] !== undefined) throw new UserError(`Game "${gameName}" already exists.  Try a different name.`);

    // Initialise game
    const game = initialiseGameState(gameName);
    store[gameName] = game;
    res.write(proTip(`Game created.  Waiting for player2 to join.  Join at /join/${gameName}\n`));

    // await join
    await game.setup;
    res.end(NEW_SCREEN + proTip(`Make your move with /game/${gameName}/${game[1].hash}/move`));
}

/**
 * Player 2 joins a game
 */
const parseJoinGame = (req: IncomingMessage): string => {
    const url = parse(req.url, true);
    const match = url.pathname.match(/\/join\/([^\/]+)/);
    if (match === null) throw new UserError('Unknown game.  Try /join/<game-name>');
    return match[1];
}
const joinGameHandler = async (req: IncomingMessage, res: ServerResponse) => {
    const gameName = parseJoinGame(req);
    const game = store[gameName];
    if (game === undefined) throw new UserError('Unknown game.  Try /create/<game-name>');
    game.setup.end();

    await game[1].move;
    res.end();
}

/**
 * Player moves
 */
const moveHandler = (req: IncomingMessage, res: ServerResponse) => {

}

/**
 * Player attacks
 */
const attackHandler = (req: IncomingMessage, res: ServerResponse) => {

}
