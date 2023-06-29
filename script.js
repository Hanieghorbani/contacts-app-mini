const nameInput = document.querySelector(".nameInput")
const numInput = document.querySelector(".numInput")
const typeOfNum = document.querySelector(".typeOfNum")
const showType = document.querySelector(".showType")
const addBtn = document.querySelector(".fa-plus")
const contents = document.querySelector(".contents")
const selectFilter = document.querySelector(".showType")
let contentArray = []
let userSelect

addBtn.addEventListener("click", () => {
  if (nameInput.value && numInput.value) {
    generateNumsDiv(nameInput.value, numInput.value, typeOfNum.value)
  }
})
nameInput.addEventListener("keydown", (e) => focus(e))
numInput.addEventListener("keydown", (e) => focus(e))
selectFilter.addEventListener("click", (e) => {
  userSelect = selectFilter.value
  if (userSelect.includes("های")) {
    userSelect = userSelect.slice(-5)
  }
  let getLocal = JSON.parse(localStorage.getItem("contacts"))
  let temp
  contents.innerHTML = ""
  getLocal.forEach((item) => {
    if (!item.includes(`${userSelect}`) && userSelect != "همگی") {
      temp = `<div class="content" style="display:none">
                ${item}
              </div>`
      contents.insertAdjacentHTML("beforeend", temp)
    } else if (userSelect != "همگی" && item.includes(`${userSelect}`)) {
      temp = `<div class="content" style="display:flex">
                ${item}
              </div>`
      contents.insertAdjacentHTML("beforeend", temp)
      removeItem()
    }
  })

  if (userSelect == "همگی") {
    contents.innerHTML = ''
    getLocalFunc()
    removeItem()
  }
})

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

  setLocalFunc(contents.children)
  numInput.value = ""
  nameInput.value = ""
  selectFilter.value = "همگی"

  removeItem()
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

function removeItem() {
  for (const trash of document.querySelectorAll(".fa-trash")) {
    trash.addEventListener("click", (e) => {
      e.target.parentElement.classList.add("fall")
      setTimeout(() => {
        e.target.parentElement.remove()
        setLocalFunc(contents.children)
      }, 500)
    })
  }
}

getLocalFunc()
removeItem()