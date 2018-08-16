import {createHash} from 'crypto'

export interface ContainedPromise<T> extends Promise<T> {
    end: (T?) => void,
    err: (any?) => Error;
}

const createAction = <T>(): ContainedPromise<T> => {
    let end;
    let err;
    const action = new Promise((resolve, reject) => {
        end = resolve;
        err = reject;
    }) as ContainedPromise<any>;
    action.end = end;
    action.err = err;
    return action;
}

export type BoardState = {
    // each cell
}[][]

export interface GameState {
    setup: ContainedPromise<BoardState>,
    [player: number]: {
        hash: string,
        move?: ContainedPromise<BoardState>,
        attack?: ContainedPromise<BoardState>,
    }
}

export const initialiseGameState = (gameName: string): GameState => {
    const hash = createHash('sha256')
        .update(Date.now().toString())
        .update(gameName)
        .digest('base64');
    return {
        setup: createAction(),
        1: {
            hash: hash.substring(0, 10),
            move: createAction(),
            attack: createAction()
        },
        2: {
            hash: hash.substring(10, 20),
            move: createAction(),
            attack: createAction()
        }
    }
}

export interface Store {
    [id: string]: GameState
}

export const defaultStore: Store = {};
export const store: Store = {};
