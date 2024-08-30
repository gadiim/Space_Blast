
export function BinaryRandom() {
    return Math.floor(Math.random() + 0.5);
}

export function Random(from, to) {
    return Math.floor(Math.random() * (to - from + 1)) + from;
}

export function toReduceSound(sound, duration) {    // sound / duration sec
    sound.currentTime = 0;                          // start playing from the beginning
    sound.play().then(() => {
        return setTimeout(() => {
            sound.pause();                          // pause playback after
        }, duration * 1000);                        // duration sec
    })
}

export function toLoopMusic(music) {
    music.play();
    music.loop = false;                         // Ensure the music does not loop automatically
    music.addEventListener('ended', () => {
        music.currentTime = 0;                  // Reset to the start
        music.play();                           // Play again
    })
};