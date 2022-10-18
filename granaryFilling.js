var tableRows = document.querySelectorAll("#production_table tbody tr");
var headerRow = document.querySelector("#production_table thead tr");
let trCells = headerRow.querySelectorAll("th");
let th4 = trCells[4];
let th = document.createElement("th");

th.innerHTML = "<a>Zapelnienie</a>";
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
  for (let i = 0; i < table.length; i++) {
    for (let j = 0; j < table.length - 1; j++) {
      let cell1 = table[j].querySelectorAll("td");
      let cell2 = table[j + 1].querySelectorAll("td");
      if (parseInt(cell1[4].innerText) > parseInt(cell2[4].innerText)) {
        let temp = table[j + 1].innerHTML;
        table[j + 1].innerHTML = table[j].innerHTML;
        table[j].innerHTML = temp;
      }
    }
  }
}
