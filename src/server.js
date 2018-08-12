const http = require('http');
const {parse} = require('url');
const PORT = 8000;

const state = {x: 2, y: 2};
state.toString = (color) => {
    let str = '';
    for (let j = 0; j < 5; j++) {
        for (let i = 0; i < 5; i++) {
            if (i === state.x && j === state.y) {
                str += color ? `[${'X'.toColor(color)}]` :'[X]';
            } else {
                str += '[ ]';
            }
        }
        str += '\n';
    }
    return str;
}

const colorToANSI = (color) => {
    switch (color) {
        case 'red': return '31'
        default: throw new Error(`Unknown color: "${color}"`);
    }
}
String.prototype.toColor = function(color) {return `[${colorToANSI(color)}m${this}[0m`}

const updateState = (action) => {
    switch (action) {
        case 'up':
            state.y -= 1;
            break;
        case 'down':
            state.y += 1;
            break;
        case 'left':
            state.x -= 1;
            break;
        case 'right':
            state.x += 1;
            break;
        default:
    }
}

const parseReq = (req) => {
    const url = parse(req.url, true);
    const action = url.query.action;
    if (action === undefined) throw new Error(`Use '?action= query param.`);
    validateAction(action);
    return action;
}

const validActions = ['up', 'down', 'left', 'right']
const validateAction = (str) => {
    if (!validActions.includes(str)) {
        throw new Error(`"${str}" not in ${validActions.toString()}`);
    }
}

http.createServer((req, res) => {
    try {
        updateState(parseReq(req));
        res.writeHead(200);
        res.write(state.toString('red'));
        res.end();
    } catch (e) {
        res.writeHead(500)
        res.end(`${e.message}\n`);
    }
}).listen(PORT || process.env.port);

