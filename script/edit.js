const urlParams = new URLSearchParams(window.location.search);
const UrlKey = urlParams.get('key')
const getAllPulblishTodo = JSON.parse(localStorage.getItem('todoObj'))
const getAllDraftTodo = JSON.parse(localStorage.getItem('todoDraft'))
const getAllDeletedTodo = JSON.parse(localStorage.getItem('deletedTodos'))
const getSection = document.getElementsByTagName('section')[0]
let todoTitle = document.getElementById('todoTitle')
let todoTextarea = document.getElementById('todoTextarea')
let showError = document.querySelector('.showError')
const updateTodo = document.getElementById('updateBtn')
const AddTodoDraft = document.getElementById('AddTodoDraft')
let todoTitleValue;
let todoTextareaValue
const checkDisabledFun = () => {
  if (todoTitleValue && todoTextareaValue) {
    updateTodo.removeAttribute('disabled')
    AddTodoDraft.removeAttribute('disabled')
  }
}
todoTitle.addEventListener('input', (() => {
  todoTitleValue = todoTitle.value
  checkDisabledFun()
}))
todoTextarea.addEventListener('input', (() => {
  todoTextareaValue = todoTextarea.value
  checkDisabledFun()
}))


const validationFun = () => {

  if (todoTitleValue == '') {
    // updateTodo.classList.add('disabled')
    return (new Error(JSON.stringify({ msg: 'Title cannot be blank', status: false })))
  }
  else if (todoTitleValue == undefined) {
    return (new Error(JSON.stringify({ msg: 'Change the Title.', status: false })))
  }
  else if (todoTitleValue?.length <= 3) {
    return (new Error(JSON.stringify({ msg: 'Title must be grater than Three characters.', status: false })))
  }
  else if (todoTitleValue.length > 100) {
    return (new Error(JSON.stringify({ msg: 'Title cannot be greater than Hundred characters', status: false })))
  }
  else if (todoTextareaValue == undefined) {
    return (new Error(JSON.stringify({ msg: 'Note/Todo cannot be blank.', status: false })))
  }
  else if (todoTextareaValue == '') {
    return (new Error(JSON.stringify({ msg: 'Change the value of Note', status: false })))
  }
  else if (todoTextareaValue?.length <= 5) {
    return (new Error(JSON.stringify({ msg: 'Note/Todo must be grater than Five characters.', status: false })))
  }
  else if (todoTextareaValue.length > 400) {
    return (new Error(JSON.stringify({ msg: 'Note/Todo cannot be greater than Four-Hundred characters', status: false })))
  }
  else {
    updateTodo.classList.remove('disable')
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

const renderTodo = (key, keyObj) => {
  if (key == UrlKey) {
    todoTitle.value = keyObj.title
    todoTextarea.value = keyObj.desc

    // Add public todo in Draft
    AddTodoDraft.addEventListener('click', (e) => {

      let errorVal = JSON.parse(validationFun().message)
      if (!errorVal.status) {
        showErrorFun(errorVal.msg)
        setTimeout(() => {
          showError.innerHTML = ''
        }, 4000);
      }

      else {
        let todoDraftObj = {}

        let forPushObj = {
          title: todoTitleValue,
          desc: todoTextareaValue,
          time: keyObj.time
        }

        todoDraftObj[key] = forPushObj
        if (getAllDraftTodo) {
          if (!getAllDraftTodo[key]['title'] == todoTitleValue) {
            getAllDraftTodo[key] = forPushObj;
            localStorage.setItem('todoDraft', JSON.stringify(getAllDraftTodo))
            delete getAllPulblishTodo[key]
            localStorage.setItem('todoObj', JSON.stringify(getAllPulblishTodo))
            location.href = '/'
          }
          else {
            showErrorFun("This title is already declared")
            setTimeout(() => {
              showError.innerHTML = ''
            }, 4000);
          }
        }
        else {

          localStorage.setItem('todoDraft', JSON.stringify(todoDraftObj))
          delete getAllPulblishTodo[key]
          localStorage.setItem('todoObj', JSON.stringify(getAllPulblishTodo))
          location.href = '/'
        }


      }
    })


    updateTodo.addEventListener('click', (e) => {

      let errorVal = JSON.parse(validationFun().message)
      if (!errorVal.status) {
        showErrorFun(errorVal.msg)
        setTimeout(() => {
          showError.innerHTML = ''
        }, 4000);
      }
      else {
        keyObj['title'] = todoTitleValue
        keyObj['desc'] = todoTextareaValue

        getAllPulblishTodo[key] = keyObj
        localStorage.setItem('todoObj', JSON.stringify(getAllPulblishTodo))
        location.href = '/'
      }

    })
  }
}

for (const key in getAllPulblishTodo) {
  renderTodo(key, getAllPulblishTodo[key])
}

for (const key in getAllDraftTodo) {
  renderTodo(key, getAllDraftTodo[key])
}
for (const key in getAllDeletedTodo) {
  renderTodo(key, getAllDeletedTodo[key])
}