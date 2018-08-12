export const colorToANSI = (color) => {
    switch (color) {
        case 'red': return '31'
        default: throw new Error(`Unknown color: "${color}"`);
    }
}
String.prototype.toColor = function(color) {return `[${colorToANSI(color)}m${this}[0m`}

