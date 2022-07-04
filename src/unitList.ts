import Path from './path'
import Unit from './unit'

export default class UnitList{
    constructor (public unitList: Unit[]){}

    public findByName(match: string): Unit {
        const matchString: string = match.toLowerCase()
        return this.unitList.find(unit => {
            return unit.name.toLowerCase() === matchString
        })
    }
    
    public findExact(match: Unit): Unit {
        return this.unitList.find(unit => {
            return match.isEqualTo(unit)
        })
    }

    public findClosest(target:Unit, path:Path, branches:number): Path[] {
        if (branches <= 0) return []
    
        // Make a dict of distance from each unit to target
        let distances: {unit: Unit, dis: number, dif: Unit, operation: "num" | "den"}[] = []
        this.unitList.forEach(unit => {
            const div: Unit = target.divideBy(unit);
            distances.push({unit, dis: div.getDistanceFromOrigin(), dif: div, operation: "num"})
            const mult: Unit = target.multiplyBy(unit);
            distances.push({unit, dis: mult.getDistanceFromOrigin(), dif: mult, operation: "den"})
        })
    
        // Sort dict from closest to furthest distance
        distances.sort(function(a,b) {
            return a.dis-b.dis
        });
    
        // If an exact match is found, send it back
        const closestPossible = distances[0]
        if (closestPossible.dis == 0) {
            path[closestPossible.operation].push(closestPossible.unit)
            return [path]
        }
    
        // Else go down multiple branches
        var paths: Path[] = []
        for (let i = 0; i < branches; i++){
            const possibleBranch = distances[i]
            //const newPath : Path = JSON.parse(JSON.stringify(path))
            const newPath : Path = path.copy()
            newPath[possibleBranch.operation].push(possibleBranch.unit)
            paths = paths.concat(this.findClosest(possibleBranch.dif, newPath, branches-1))
        }
        return paths
    }
}