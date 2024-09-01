import { isPaused } from './game.js';
// import { updateSetting } from './DBStorage.js';

export let darkMode = true;
export let sound = true;//false
export let music = true;//true

// main container
const gameContainer = document.getElementsByClassName('game-container')[0]; // reference to the first element of the collection

// status display // right
const statusDisplay = document.getElementsByClassName('status-display')[0]; // reference to the first element of the collection
const cell = document.querySelectorAll('.status-display table tr td:last-of-type');

// canvas
// const canvas = document.getElementsByTagName('canvas')[0];
const canvas = document.getElementById('gameCanvas');

// buttons
const buttons = document.querySelectorAll('.button-display button');
const buttonDarkMode = document.getElementById('btn-dark-mode');
const buttonSoundMode = document.getElementById('btn-sound-mode');
const buttonMusicMode = document.getElementById('btn-music-mode');
const buttonDifficultMode = document.getElementById('btn-difficult-mode');
const buttonStart = document.getElementById('btn-start');
export const buttonPause = document.getElementById('btn-pause');
const buttonNewGame = document.getElementById('btn-new-game');
const buttonExitGame = document.getElementById('btn-exit-game');

export function toggleDark() {
    darkMode = !darkMode;
// savesetting in IndexedDB
    // updateSetting('toggleDark', darkMode);
// main container
    gameContainer.style.backgroundColor = darkMode ?
        'var(--main-background-color-dark-mode)' :
        'var(--main-background-color-light-mode)'
// status display // right
    statusDisplay.style.color = darkMode ?
        'var(--text-color-dark-mode)' :
        'var(--text-color-light-mode)'
    cell.forEach(c => {
        c.style.backgroundColor = darkMode ?
        'var(--cell-background-color-dark-mode)' :
        'var(--cell-background-color-light-mode)';
    });
// canvas
    canvas.style.backgroundColor = darkMode ?
        'var(--canvas-background-color-dark-mode)' :
        'var(--canvas-background-color-light-mode)';
    canvas.style.borderColor= darkMode ?
        'var(--canvas-border-color-dark-mode)' :
        'var(--canvas-border-color-light-mode)';
// buttons
    buttonDarkMode.innerText = darkMode ?
        'light mode' :
        'dark mode';
    buttons.forEach(b => {
        b.style.backgroundColor = darkMode ?
            'var(--button-background-color-dark-mode)' :
            'var(--button-background-color-light-mode)';
        b.style.color = darkMode ?
            'var(--button-text-color-dark-mode)' :
            'var(--button-text-color-light-mode)';
    });
}

export function toggleSound() {
    sound = !sound;
    buttonSoundMode.innerText = sound ? 'sound on' : 'sound off';
};


export function toggleMusic() {
    music = !music;
    buttonMusicMode.innerText = music ? 'music on' : 'music off';
}

export function togglePause() {
    buttonPause.innerText = isPaused ? 'pause on' : 'pause off';    
}
