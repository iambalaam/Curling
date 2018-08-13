import {formatMessage, proTip} from '../proTip';

describe('formatMessage()', () => {
    it('handles empty message', () => {
        expect(formatMessage('')).toEqual(['']);
    })
    it('cuts words too long', () => {
        expect(formatMessage(// 70 long
            '1234567890123456789012345678901234567890123456789012345678901234567890'
        )).toEqual(// 63 + ... long
            ['123456789012345678901234567890123456789012345678901234567890123...']
        )
    })
    it('cuts a sentence before 66', () => {
        expect(formatMessage('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'))
            .toEqual(['Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do',
                'eiusmod tempor incididunt ut labore et dolore magna aliqua.'])
    })
    it('cuts a sentence at 66', () => {
        expect(formatMessage('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed doesa eiusmod tempor incididunt ut labore et dolore magna aliqua.'))
            .toEqual(['Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed doesa',
                'eiusmod tempor incididunt ut labore et dolore magna aliqua.'])
    })
    it('maxes at 5 lines', () => {
        expect(formatMessage('1234567890123456789012345678901234567890 1234567890123456789012345678901234567890 1234567890123456789012345678901234567890 1234567890123456789012345678901234567890 1234567890123456789012345678901234567890 1234567890123456789012345678901234567890'))
            .toEqual([ //40 long
            '1234567890123456789012345678901234567890',
            '1234567890123456789012345678901234567890',
            '1234567890123456789012345678901234567890',
            '1234567890123456789012345678901234567890',
            '1234567890123456789012345678901234567890',
            '...'])
    })
})

describe('proTip()', () => {
    it('handles empty message', () => {
        expect(proTip('')).toBe(
`____________
|          |
|          |
|__________|
(\\__/) ||
(•ㅅ•)  ||
/ 　 づ
`)
    })
})
