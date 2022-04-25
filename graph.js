var items = [
    [1, 2],
    [3, 4],
    [5, 6]
  ];

items.forEach(addDatapoint)

function addDatapoint(value, index, array){
    let datapoint =  document.createElement("div")
    datapoint.style.left = value[0] * 10;
    datapoint.style.bottom = value[1] * 10;
    datapoint.className = 'datapoint'
    document.body.appendChild(datapoint);
}