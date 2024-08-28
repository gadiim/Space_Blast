import { Shot } from './starship.js';

export const keys = {
    ArrowLeft: false,
    ArrowRight: false,
    ArrowUp: false,
    ArrowDown: false,
    Space: false,
    Enter: false,
    p: false
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
    } else if (event.key === 'Enter') {
        keys.Enter = true;
    } else if (p.key === 'p') {
        keys.p = true;
    }
}

export function onKeyUp(event) {                               // key up event
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
    } else if (p.key === 'p') {
        keys.p = false;
    }
}

document.addEventListener('keydown', onKeyDown, Shot);
document.addEventListener('keyup', onKeyUp);
document.addEventListener('keydown', Shot);