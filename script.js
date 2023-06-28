const nameInput = document.querySelector(".nameInput")
const numInput = document.querySelector(".numInput")
const typeOfNum = document.querySelector(".typeOfNum")
const showType = document.querySelector(".showType")
const addBtn = document.querySelector(".fa-plus")
const contents = document.querySelector(".contents")
let contentArray = []

addBtn.addEventListener("click", () => {
  if (nameInput.value && numInput.value) {
    generateNumsDiv(nameInput.value, numInput.value, typeOfNum.value)
  }
})

nameInput.addEventListener("keydown", (e) => focus(e))
numInput.addEventListener("keydown", (e) => focus(e))

function focus(e) {
  if (e.keyCode == 13) {
    e.target.nextElementSibling.focus()
  }
}

function generateNumsDiv(name, num, type) {
  let temp = `<div class="content">
    <div class="infos">
      <p>${name}</p>
      <p>${num}</p>
      <p>${type}</p>
    </div>
    <i class="fa fa-trash"></i>
  </div>`

  contents.insertAdjacentHTML("beforeend", temp)
  numInput.value = ""
  nameInput.value = ""
  setLocalFunc(contents.children)

  for (const trash of document.querySelectorAll(".fa-trash")) {
    trash.addEventListener("click", (e) => {
      e.target.parentElement.remove()
      setLocalFunc(contents.children)
    })
  }
}

function setLocalFunc(array) {
  if (!array) {
    localStorage.setItem("contacts", [])
  } else {
    contentArray = []
    for (const content of array) {
      contentArray.push(content.innerHTML)
    }
    localStorage.removeItem("contacts")
    localStorage.setItem("contacts", JSON.stringify(contentArray))
  }
}

function getLocalFunc() {
  let getLocal = JSON.parse(localStorage.getItem("contacts"))
  if (!getLocal) {
    getLocal = []
  } else {
    getLocal.forEach((item) => {
      let newContent = document.createElement("div")
      newContent.className = "content"
      newContent.innerHTML = item
      contents.append(newContent)
    })
  }
}

getLocalFunc()

for (const trash of document.querySelectorAll(".fa-trash")) {
  trash.addEventListener("click", (e) => {
    e.target.parentElement.remove()
    setLocalFunc(contents.children)
  })
}
