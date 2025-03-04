export class Currency {
    private readonly _code: string;
    private readonly _name: string;

    constructor(code: string, name: string) {
        this._code = code;
        this._name = name;
    }

    get code(): string {
        return this._code;
    }

    get name(): string {
        return this._name;
    }
}