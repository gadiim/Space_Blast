
export function BinaryRandom() {
    return Math.floor(Math.random() + 0.5);
}

export function Random(from, to) {
    return Math.floor(Math.random() * (to - from + 1)) + from;
}
