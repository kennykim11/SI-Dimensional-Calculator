import Path from "./path";
import UnitList from "./unitList";

export default class Unit{
    constructor(
        public s: number, 
        public m: number, 
        public kg: number, 
        public A: number, 
        public K: number, 
        public mol: number, 
        public cd: number,
        public name: string = "",
        public unitName: string = "",
        public unitSymbol: string = "",
        public type: string = "",
        public wikiLink: string = ""
    ){}

    public getDistanceTo(other:Unit) {
        return Math.sqrt(
            (this.s - other.s)**2 + 
            (this.m - other.m)**2 + 
            (this.kg - other.kg)**2 + 
            (this.A - other.A)**2 + 
            (this.K - other.K)**2 + 
            (this.mol - other.mol)**2 + 
            (this.cd - other.cd)**2
        )
    }

    public getDistanceFromOrigin() {
        return Math.sqrt(
            this.s**2 + 
            this.m**2 + 
            this.kg**2 + 
            this.A**2 + 
            this.K**2 + 
            this.mol**2 + 
            this.cd**2
        )
    }

    public multiplyBy(other:Unit) : Unit {
        return new Unit(
            this.s + other.s, 
            this.m + other.m, 
            this.kg + other.kg, 
            this.A + other.A, 
            this.K + other.K, 
            this.mol + other.mol, 
            this.cd + other.cd)
    }

    public divideBy(other:Unit) : Unit {
        return new Unit(
            this.s - other.s, 
            this.m - other.m, 
            this.kg - other.kg, 
            this.A - other.A, 
            this.K - other.K, 
            this.mol - other.mol, 
            this.cd - other.cd)
    }

    public isEqualTo(other:Unit) : Boolean {
        return (
            this.s == other.s &&
            this.m == other.m &&
            this.kg == other.kg &&
            this.A == other.A &&
            this.K == other.K &&
            this.mol == other.mol &&
            this.cd == other.cd
        )
    }

    public getComposition(unitList: UnitList): Path[] {
        const resultStrings: string[] = []
        const resultPaths: Path[] = []
        unitList.findClosest(this, new Path(), 4).forEach(path => {
            path.sortUnits()
            let pathStr: string = path.debugString()
            if (!resultStrings.includes(pathStr)){
                resultStrings.push(pathStr)
                resultPaths.push(path)
            }
        });
        return resultPaths
    }

    public htmlBaseUnits(): string{
        let text: string = ""
        const fundamentals: string[] = ["s", "m", "kg", "A", "K", "mol", "cd"]
        fundamentals.forEach((sym)=>{
            if (this[sym] != 0) text += `${sym}<sup>${this[sym]}</sup>`})
        return text
    }

    public derivedUnit(): string{
        if (this.unitName != ""){
            return `Derived Unit: ${this.unitName} (${this.unitSymbol})`}
        return ""
    }
}

