import Unit from "./unit";

export const colorType = {
    "Base": "#FFC2C2",
    "Kinematic": "#FFF2C2",
    "Mechanical": "#FEFFC2",
    "Photometric": "#D2FFC2",
    "Thermodynamic": "#C2FFDE",
    "Electromagnetic": "#C2E6FF"}

export function createFraction(num: Unit[], den: Unit[]): HTMLDivElement{
    const numRow: HTMLDivElement = createRow(num)
    const denRow: HTMLDivElement = createRow(den)
    const fracBar: HTMLDivElement = document.createElement("div")
    fracBar.className = "fractionBar"

    const newFractionTile: HTMLDivElement = document.createElement("div")
    newFractionTile.className = "fraction"
    if (!num.length) addUnitToRow(numRow, new Unit(0, 0, 0, 0, 0, 0, 0, "1", "", "", "Base"))
    newFractionTile.appendChild(numRow)
    if (den.length){
        newFractionTile.appendChild(fracBar)
        newFractionTile.appendChild(denRow)
    }
    return newFractionTile
}

function createRow(units: Unit[]): HTMLDivElement{
    const newRow: HTMLDivElement = document.createElement("div")
    newRow.className = "row"
    units.forEach((unit) => addUnitToRow(newRow, unit))
    return newRow
}

export function addUnitToRow(row: HTMLDivElement, unit: Unit){
    const newUnitTile: HTMLDivElement = document.createElement("div")
    newUnitTile.className = "unitTile"
    newUnitTile.innerText = unit.name
    newUnitTile.style.backgroundColor = colorType[unit.type]

    const newUnitTooltip: HTMLDivElement = document.createElement("div")
    newUnitTooltip.className = "tooltip"
    newUnitTooltip.innerHTML = `<p>Base Units: ${unit.htmlBaseUnits()}</p>`
    + `<p>Type: ${unit.type}</p>`
    + `<p>${unit.derivedUnit()}</p>`
    + `<p><a href="https://en.wikipedia.org/wiki/${unit.wikiLink}">Wikipedia</a></p>`
    newUnitTile.appendChild(newUnitTooltip)

    row.appendChild(newUnitTile)
}