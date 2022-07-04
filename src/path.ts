import Unit from './unit'

export default class Path {
    constructor(
        public num: Unit[] = [],
        public den: Unit[] = []
    ){}

    public sortUnits() {
        this.num.sort(function(a: Unit,b: Unit) {
            return a.name.localeCompare(b.name)
        })
        this.den.sort(function(a: Unit,b: Unit) {
            return a.name.localeCompare(b.name)
        })
    }

    public getIdentifier(): string {
        this.sortUnits()
        return JSON.stringify(this)
    }

    public debugString(): string {
        let numStrings = this.num.map(numUnit => numUnit.name)
        let denStrings = this.den.map(denUnit => denUnit.name)
        return `(${numStrings.join(' * ')}) / (${denStrings.join(' * ')})`
    }

    public copy(): Path {
        return new Path(this.num.slice(), this.den.slice())
    }
}