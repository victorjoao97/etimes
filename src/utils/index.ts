export class Plural {
    constructor(protected readonly quantity: number) { }

    public toChar(charPlural: string, charSingular: string = '') {
        return this.quantity > 1 ? charPlural : charSingular;
    }
}