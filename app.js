/**
 * Select items
 */
const alert = document.querySelector(".alert");
const form = document.querySelector(".grocery-form");
const grocery = document.getElementById("grocery");
const submitBtn = document.querySelector(".submit-btn");
const container = document.querySelector(".grocery-container");
const list = document.querySelector(".grocery-list");
const clearBtn = document.querySelector(".clear-btn");
/**
 * edit option
 */
let editElement;
let editFlag = false;
let editID = "";

/*
 *event listeners
 */
//submit form
// form.addEventListener("submit", addItem);
form.addEventListener("submit", addItem);
clearBtn.addEventListener("click", clearItems);

/* 
function
 */
function addItem(e) {
  e.preventDefault();
  //   console.log(grocery.value);
  const value = grocery.value;

  const id = new Date().getTime().toString(); //naive approach
  //   console.log(id);
  if (value && !editFlag) {
    const element = document.createElement("article");
    element.classList.add("grocery-item");
    const attr = document.createAttribute("data-id");
    attr.value = id;
    element.setAttributeNode(attr);
    element.innerHTML = `
    <p class="title">${value}</p>
    <div class="btn-container">
        <button type="button" class="edit-btn">
            <i class="fas fa-edit"></i>
        </button>
        <button type="button" class="delete-btn">
            <i class="fas fa-trash"></i>
        </button>
    </div>`;
    const deleteBtn = element.querySelector(".delete-btn");
    const editBtn = element.querySelector(".edit-btn");
    deleteBtn.addEventListener("click", deleteItem);
    editBtn.addEventListener("click", editItem);
    //append child
    list.appendChild(element);
    displayAlert("item added to the list", "success");
    container.classList.add("show-container");
    //add to local storage
    addToLocalStorage(id, value);
    //set back to default
    setBackToDefault();

    // console.log("adding item to the list");
  } else if (value && editFlag) {
    // console.log("edit");
    editElement.innerHTML = value;
    displayAlert("value changed", "success");
    //edit local storage
    editLocalStorage(editID, value);
    setBackToDefault();
  } else {
    displayAlert("please enter value", "danger");
  }
}

//display alert
function displayAlert(text, action) {
  alert.textContent = text;
  alert.classList.add(`alert-${action}`);
  //remove alert
  setTimeout(() => {
    alert.textContent = "";
    alert.classList.remove(`alert-${action}`);
  }, 1000);
}
//clear list
function clearItems() {
  const items = document.querySelectorAll(".grocery-item");
  if (items.length > 0) {
    items.forEach(function (item) {
      list.removeChild(item);
    });
  }
  container.classList.remove("show-container");
  displayAlert("empty list", "success");
  setBackToDefault();
  // localStorage.removeItem("list");
}
//delete function
function deleteItem(e) {
  const element = e.currentTarget.parentElement.parentElement;
  const id = element.dataset.id;
  //   let test = list.removeChild(element);
  //   console.log(element.child)
  list.removeChild(element);
  if (list.children.length === 0) {
    container.classList.remove("show-container");
  }
  displayAlert("item removed", "danger");
  setBackToDefault();
  //remove from local storage
  removeFromLocalStorage(id);
  //   console.log(test);
}
//edit function
function editItem(e) {
  const element = e.currentTarget.parentElement.parentElement;
  //set edit item
  editElement = e.currentTarget.parentElement.previousElementSibling;
  //set for value
  grocery.value = editElement.innerHTML;
  editFlag = true;
  editID = element.dataset.id;
  submitBtn.textContent = "edit";
}
//set back to default
function setBackToDefault() {
  grocery.value = "";
  editFlag = false;
  editID = "";
  submitBtn.textContent = "submit";
}
/* 
local storage
 */
function addToLocalStorage(id, value) {
  const grocery = { id, value };
  //   console.log(grocery);
  let items = localStorage.getItem("list")
    ? JSON.parse(localStorage.getItem("list"))
    : [];
  items.push(grocery);
  localStorage.setItem("list", JSON.stringify(items));

  //   console.log("add to local storage");
}
function editLocalStorage(id, value) {}
function removeFromLocalStorage(id) {}

/* 
setup items
 */
