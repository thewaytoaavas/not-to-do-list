const taskList = [];
const badList = [];
const weekHrs = 7 * 24;

const taskListElm = document.getElementById("task-list");
const badListElm = document.getElementById("bad-list");

const handleOnSubmit = e => {
	const frmDt = new FormData(e);

	console.log(frmDt);
	const task = frmDt.get("task");
	const hr = +frmDt.get("hr");
	const obj = {
		task,
		hr,
	};

	const ttlHr = taskTotalHrs();
	const ttlBadHr = badTotalHrs();

	if (ttlHr + ttlBadHr + hr > weekHrs) {
		return alert("You have exceeded the weekly hours");
	}
	taskList.push(obj);

	display();
};

//display task list in the dom
const display = () => {
	let str = "";

	// loop through the task list and convert in to tr string

	taskList.map((item, i) => {
		str += `
  <tr>
  <td>
    <input type="checkbox" />
  </td>
  <td>${item.task}</td>
  <td> ${item.hr} hrs</td>
  <td>
    <button class="btn btn-danger"  onclick="deleteTaskList(${i})">
      <i class="fa-solid fa-trash-can"></i>
    </button>
    <button class="btn btn-primary" onclick = "markAsNotToDo(${i})">
      <i class="fa-solid fa-arrow-right-long"></i>
    </button>
  </td>
</tr>
  `;
	});

	taskListElm.innerHTML = str;
};

// display bad task list in the dom

const displayBadList = () => {
	let str = "";

	badList.map((item, i) => {
		str += `
 <tr>
 <td>
   <input type="checkbox" />
 </td>
 <td>${item.task}</td>
 <td>${item.hr}hrs</td>
 <td>
   <button class="btn btn-warning" onclick = "markAsTask(${i})">
     <i class="fa-solid fa-arrow-left-long"></i>
   </button>
   <button class="btn btn-danger" onclick="deleteBadList(${i})">
     <i class="fa-solid fa-trash-can"></i>
   </button>
 </td>
</tr>
 
 `;
	});

	badListElm.innerHTML = str;
	badTotalHrs();
};

//delete item form task list

const deleteTaskList = i => {
	const itm = taskList.splice(i, 1);
	display();
	return itm[0];
};

//delete item form bad list

const deleteBadList = i => {
	const itm = badList.splice(i, 1);
	displayBadList();
	return itm[0];
};

//mark task as to not to do item

const markAsNotToDo = i => {
	const badItm = deleteTaskList(i);
	badList.push(badItm);
	displayBadList();
};

//mark task as task item

const markAsTask = i => {
	const badItm = deleteBadList(i);
	taskList.push(badItm);
	display();
};

// display total task hours

const taskTotalHrs = () => {
	const total = taskList.reduce((acc, item) => acc + item.hr, 0);

	document.getElementById("total-hr").innerHTML = total;
	return total;
};

// display total bad hours
const badTotalHrs = () => {
	const total = badList.reduce((acc, item) => acc + item.hr, 0);

	document.getElementById("bad-hr").innerHTML = total;
	return total;
};
