var tableRows = document.querySelectorAll("#production_table tbody tr");
var headerRow = document.querySelector("#production_table thead tr");
let trCells = headerRow.querySelectorAll("th");
let th4 = trCells[4];
let th = document.createElement("th");
var sortOrder = 0;
th.innerHTML = "<a>Zapelnienie</a>";
th.style.cursor = "pointer";
th.addEventListener("click", function () {
  sortTableByGranaryFill(tableRows);
});
headerRow.insertBefore(th, th4);

for (let i = 0; i < tableRows.length; i++) {
  let cells = tableRows[i].getElementsByTagName("td");
  let resources = cells[3].querySelectorAll("span.res"); // cells which contain resources values in spans
  let granary = cells[4].innerText; // granary capacity
  let granaryPercentage = (
    (getMaxResource(resources) / granary) *
    100
  ).toFixed();

  let tdCapacity = tableRows[i].insertCell(4);
  tdCapacity.style.fontWeight = "bold";
  if (granaryPercentage >= 85) tdCapacity.style.color = "red";
  if (granaryPercentage < 85 && granaryPercentage > 60)
    tdCapacity.style.color = "rgb(247 103 0)";
  if (granaryPercentage <= 60) tdCapacity.style.color = "green";
  tdCapacity.innerText = granaryPercentage + "%";
}

function getMaxResource(resources) {
  let max = 0;
  resources.forEach((resource) => {
    resource = resource.innerText.replace(".", "");
    if (resource > max) max = resource;
  });
  return max;
}

function sortTableByGranaryFill(table) {
  let indexes = [];
  let tableCells = [];
  let rawHTML = [];
  for (let i = 0; i < table.length; i++) {
    indexes.push(i);
    tableCells.push(table[i].querySelectorAll("td")[4].innerText);
    rawHTML.push(table[i].innerHTML);
  }
  if (sortOrder == 0) {
    for (let i = 0; i < table.length; i++) {
      for (let j = 0; j < table.length - 1; j++) {
        if (
          parseInt(tableCells[indexes[j]]) <
          parseInt(tableCells[indexes[j + 1]])
        ) {
          let temp = indexes[j];
          indexes[j] = indexes[j + 1];
          indexes[j + 1] = temp;
        }
      }
    }
  }
  if (sortOrder == 1) {
    for (let i = 0; i < table.length; i++) {
      for (let j = 0; j < table.length - 1; j++) {
        if (
          parseInt(tableCells[indexes[j]]) >
          parseInt(tableCells[indexes[j + 1]])
        ) {
          let temp = indexes[j];
          indexes[j] = indexes[j + 1];
          indexes[j + 1] = temp;
        }
      }
    }
  }
  for (let i = 0; i < indexes.length; i++)
    table[i].innerHTML = rawHTML[indexes[i]];

  if (sortOrder) sortOrder = 0;
  else sortOrder = 1;
}
