interface String {

    /** Converts all alphabetic characters that are the start of a word, to uppercase. */
    toTitleCase(): string;
}

String.prototype.toTitleCase = function (): string {
    return (this as string)
        .split(" ")
        .map(word => (word.length == 1) ? word : `${word[0].toUpperCase()}${word.slice(1)}`)
        .join(" ");
}