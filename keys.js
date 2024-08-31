import { Shot } from './starship.js';
import { isGame } from './game.js';

export const keys = {
    ArrowLeft: false,
    ArrowRight: false,
    ArrowUp: false,
    ArrowDown: false,
    ArrowDown: false,
    Space: false,
    Enter: false,
    p: false,
    s: false,
    m: false,
    d: false,
    '0': false
};

export function onKeyDown(event) {                             // key down event
    if (event.key === 'ArrowLeft') {
        keys.ArrowLeft = true;
    } else if (event.key === 'ArrowRight') {
        keys.ArrowRight = true;
    } else if (event.key === 'ArrowUp') {
        keys.ArrowUp = true;
    } else if (event.key === 'ArrowDown') {
        keys.ArrowDown = true;
    } else if (event.key === ' ') {  // spacebar
        keys.Space = true;
    } else if (event.key === 'Enter' && !isGame) {
        keys.Enter = true;
    } else if (event.key === 'p') {
        keys.p = true;
    } else if (event.key === 's') {
        keys.s = true;
    } else if (event.key === 'm') {
        keys.m = true;
    } else if (event.key === 'd') {
        keys.d = true;
    } else if (event.key === '0') {
        keys['0'] = true;
    }
}

export function onKeyUp(event) {// key up event
    if (event.key === 'ArrowLeft') {
        keys.ArrowLeft = false;
    } else if (event.key === 'ArrowRight') {
        keys.ArrowRight = false;
    } else if (event.key === 'ArrowUp') {
        keys.ArrowUp = false;
    } else if (event.key === 'ArrowDown') {
        keys.ArrowDown = false;
    } else if (event.key === ' ') {
        keys.Space = false;
    } else if (event.key === 'Enter') {
        keys.Enter = false;
    } else if (event.key === 'p') {
        keys.p = false;
    } else if (event.key === 's') {
        keys.s = false;
    } else if (event.key === 'm') {
        keys.m = false;
    } else if (event.key === 'd') {
        keys.d = false;
    } else if (event.key === '0') {
        keys['0'] = false;
    }
}

document.addEventListener('keydown', onKeyDown);
document.addEventListener('keyup', onKeyUp);
document.addEventListener('keydown', Shot);