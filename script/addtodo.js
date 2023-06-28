// Display notes At home page 

const AddTodoBtn = document.getElementById('AddTodobtn');
const AddTodoDraftBtn = document.getElementById('AddTodoDraft');
let AlltodoObj = {};
let todoTitle;
let todoTextarea;
const todoTitleInput = document.getElementsByTagName('input')
const todoTextarearInput = document.getElementsByTagName('textarea')
let showError = document.querySelector('.showError')
let forNone = document.querySelector('.forNone')
const validationFun = () => {
  if (todoTitle == '') {
    return (new Error(JSON.stringify({ msg: 'Title cannot be blank.', status: false })))
  }
  else if (todoTextarea == undefined) {
    return (new Error(JSON.stringify({ msg: 'Note/Todo cannot be blank.', status: false })))
  }
  else if (todoTitle == undefined) {
    return (new Error(JSON.stringify({ msg: 'Title cannot be blank.', status: false })))
  }
  else if (todoTextarea == '') {
    return (new Error(JSON.stringify({ msg: 'Note/Todo cannot be blank.', status: false })))
  }
  else if (todoTitle?.length <= 3) {
    return (new Error(JSON.stringify({ msg: 'Title must be grater than Three characters.', status: false })))
  }
  else if (todoTextarea?.length <= 5) {
    return (new Error(JSON.stringify({ msg: 'Note/Todo must be grater than Five characters.', status: false })))
  }
  else if (todoTitle.length > 100) {
    return (new Error(JSON.stringify({ msg: 'Title cannot be greater than Hundred characters', status: false })))
  }
  else if (todoTextarea.length > 400) {
    return (new Error(JSON.stringify({ msg: 'Note/Todo cannot be greater than Four-Hundred characters', status: false })))
  }
  else {
    return (new Error(JSON.stringify({ status: true })))
  }
}

const showErrorFun = (msg) => {
  showError.innerHTML += `<div class="bg-red-600 forNone border-t-4 border-teal-500 rounded-b text-black-900 px-4 py-3 shadow-md" role="alert">
   <div class="flex">
      <div class="py-1"><svg class="fill-current h-6 w-6 text-teal-500 mr-4" xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20">
          <path
            d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
        </svg></div>
      <div>
        <p class="font-bold">Error</p>
        <p class="text-sm">${msg}</p>
      </div>
    </div>
    </div>`
}
function a() {
  todoTitle = document.getElementById('todoTitle').value
}
function b() {
  todoTextarea = document.getElementById("todoTextarea").value
}
AddTodoBtn.addEventListener('click', () => {
  let errorVal = JSON.parse(validationFun().message)
  if (!errorVal.status) {
    console.log('inside');
    showErrorFun(errorVal.msg)
    setTimeout(() => {
      showError.innerHTML = ''
    }, 4000);
  }

  else {
    let GetUserTodos = localStorage.getItem('todoObj');
    let keyArr = []
    for (const key in JSON.parse(GetUserTodos)) {
      keyArr.push(key)
    }
    let generateId = Math.random() * 100 + keyArr.length
    generateId = JSON.stringify(generateId)
    let todoObj = {
      title: todoTitle,
      desc: todoTextarea,
      time: new Date().toLocaleString(undefined, { timeZone: 'Asia/Kolkata' })
    }
    AlltodoObj[generateId] = todoObj

    if (GetUserTodos) {
      if (!GetUserTodos.includes(todoTitle)) {
        GetUserTodos = JSON.parse(GetUserTodos)
        GetUserTodos[generateId] = todoObj
        localStorage.setItem('todoObj', JSON.stringify(GetUserTodos))
        location.reload()
      }

      else {

        showErrorFun('This title is already declared.')
        setTimeout(() => {
          showError.style.display = 'none'
        }, 4000);
      }
    }
    else {
      localStorage.setItem('todoObj', JSON.stringify(AlltodoObj))
      location.reload()
    }

  }

})

AddTodoDraftBtn.addEventListener('click', (e) => {


  if (!validationFun) {
    console.log('Invalid query')
  }


  else {

    let GetUserTodos = localStorage.getItem('todoDraft');
    let keyArr = []
    for (const key in JSON.parse(GetUserTodos)) {
      keyArr.push(key)
    }
    let generateId = Math.random() * 100 + keyArr.length
    generateId = JSON.stringify(generateId)
    let todoObj = {
      title: todoTitle,
      desc: todoTextarea,
      time: new Date().toLocaleString(undefined, { timeZone: 'Asia/Kolkata' }),
    }
    AlltodoObj[generateId] = todoObj

    if (GetUserTodos) {
      if (!GetUserTodos.includes(todoTitle)) {
        GetUserTodos = JSON.parse(GetUserTodos)
        GetUserTodos[generateId] = todoObj
        localStorage.setItem('todoDraft', JSON.stringify(GetUserTodos))
        location.reload()
      }
      else {
        console.log("This title is already declared");
      }
    }
    else {
      localStorage.setItem('todoDraft', JSON.stringify(AlltodoObj))
      location.reload()
    }

  }
})

