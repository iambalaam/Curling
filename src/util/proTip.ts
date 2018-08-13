/**
 * Max lines = 5 + '...'
 * Max line length = 72 = 3 + (message: 66) + 3
 */
export const formatMessage = (message: string, maxLines = 5, maxLength = 66) => {
    const words = message.replace(/\s+/g, ' ').split(' ');

    let formattedStrings = [''];

    for (let word of words) {
        // Word doesn't fit in a line
        if (word.length > maxLength) {
            word = `${word.substring(0, maxLength - 3)}...`;
        }

        // Can word fit
        const lastLine = formattedStrings[formattedStrings.length - 1];
        const length = lastLine ? lastLine.length + 1 : 0;

        if (length + word.length <= maxLength) {
            formattedStrings[formattedStrings.length - 1] = lastLine
                ? `${lastLine} ${word}`
                : word;

        } else if (formattedStrings.length < maxLines) {
            // Word on new line
            formattedStrings.push(word);
        } else {
            // Too many lines
            formattedStrings.push('...');
            break;
        }

    }
    return formattedStrings
}

export const proTip = (message) => {
    const formattedMessage = formatMessage(message);
    const width = Math.max(...formattedMessage.map((s) => s.length), 6) + 6;
    const top = `${Array(width).fill('_').join('')}\n|${Array(width - 2).fill(' ').join('')}|`;
    const middle = formattedMessage
        .map(line => `|  ${line + Array(width - line.length - 6).fill(' ').join('')}  |`).join('\n');
    const bottom = `|${Array(width - 2).fill('_').join('')}|`;
    const bunny = '(\\__/) ||\n'+
                  '(•ㅅ•)  ||\n' +
                  '/ 　 づ'
    return `${top}\n${middle}\n${bottom}\n${bunny}\n`;
};
