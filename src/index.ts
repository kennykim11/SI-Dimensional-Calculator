import Unit from "./unit"
import UnitList from "./unitList"
import unitListJson from "./unitsList.json"
import Path from "./path"
import { createFraction, colorType } from "./fraction"

const anyWindow: any = (window as any)
anyWindow.addUnit = addUnit
anyWindow.calculateFinal = calculateFinal
anyWindow.clearScreen = clearScreen

const allUnits: UnitList = importAllUnits()
anyWindow.allUnits = allUnits
const finalFrac:{"num": Unit[], "den": Unit[]} = {"num": [allUnits.findByName('Acceleration')], "den": [allUnits.findByName('Pressure')]}
let finalUnit: Unit

window.onload = function() {
    const unitDropdown = document.getElementById("unitDrop")
    allUnits.unitList.forEach((unit, idx) => {
        const option = document.createElement("option")
        option.value = unit.name
        option.innerHTML = `${unit.type} - ${unit.name}`
        option.style.backgroundColor = colorType[unit.type]
        unitDropdown.appendChild(option)
    });
    renderFraction()
    calculateFinal()
}

function importAllUnits(): UnitList {
    let list: Unit[] = []
    unitListJson.forEach(u => {
        list.push(new Unit(u.s, u.m, u.kg, u.A, u.K, u.mol, u.cd, u.name, u.unitName, u.unitSymbol, u.type, u.wikiLink))
    })
    return new UnitList(list)
}

function addUnit(operation){
    const unitDropdown: HTMLSelectElement = document.getElementById("unitDrop") as HTMLSelectElement
    const selectedUnit: Unit = allUnits.findByName(unitDropdown.value)
    finalFrac[operation].push(selectedUnit)
    renderFraction()
}

function renderFraction() {
    const inputDiv: HTMLDivElement = document.getElementById("input") as HTMLDivElement
    inputDiv.innerHTML = ''
    inputDiv.appendChild(createFraction(finalFrac.num, finalFrac.den))
}

function calculateFinal(){
    const finalNum: Unit = finalFrac["num"].reduce(
        (previousValue, currentValue) => previousValue.multiplyBy(currentValue),
        new Unit(0, 0, 0, 0, 0, 0, 0)
    );
    const finalDen: Unit = finalFrac["den"].reduce(
        (previousValue, currentValue) => previousValue.multiplyBy(currentValue),
        new Unit(0, 0, 0, 0, 0, 0, 0)
    );
    finalUnit = finalNum.divideBy(finalDen)
    document.getElementById("finalDerivedUnit").innerHTML = "In SI Base Units: "+finalUnit.htmlBaseUnits()

    const solutions: Path[] = finalUnit.getComposition(allUnits)
    const answersDiv: HTMLDivElement = document.getElementById("answer") as HTMLDivElement
    answersDiv.innerHTML = ''
    solutions.forEach((path) => answersDiv.appendChild(createFraction(path.num, path.den)))
}

function clearScreen(){
    finalFrac.num = []
    finalFrac.den = []
    document.getElementById("input").innerHTML = ''
    document.getElementById("answer").innerHTML = ''
    document.getElementById("finalDerivedUnit").innerHTML = "In SI Base Units: "
}