interface Array<T> {

    /** Rearranges the array randomly. */
    shuffle(): Array<T>;
}

Array.prototype.shuffle = function <T>(): Array<T> {
    return this.sort(() => Math.random() - 0.5);
}