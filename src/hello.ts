function add_func(e){
    console.log(e)
    const input1 = document.getElementById("field1") as HTMLInputElement;
    const input2 = document.getElementById("field2") as HTMLInputElement;
    const answer = input1.valueAsNumber + input2.valueAsNumber;
    console.log(input1.valueAsNumber)
    document.getElementById("answer").innerHTML = String(answer);
}