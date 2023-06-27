
const allTodoContainer = document.getElementById("allTodoContainer")
let todoObj = JSON.parse(localStorage.getItem('todoObj'))
const nullOrNot = document.getElementById('nullOrNot')
let disable_Button = document.getElementById('btn')
let showDeleted = document.querySelector('.showDeleted')
if(todoObj){
  if (Object.keys(todoObj).length == 0 ? nullOrNot.innerHTML += `<span  class="text-[2rem]  font-bold">MY Todos :- No Todos</span>` : nullOrNot.innerHTML += `<span  class="text-[2rem]  font-bold">MY Todos :- </span>`)
}
else{
  nullOrNot.innerHTML += `<span  class="text-[2rem]  font-bold">MY Todos :- No Todos</span>`
}


  for (const key in todoObj) {

    let maketodo = `<div class=" pb-3 md:p-4 lg:w-1/3">
    <div
      class="h-full bg-gray-800 bg-opacity-40 px-8 pt-16 pb-24 rounded-lg overflow-hidden text-center relative">
      <h2 class="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">Todo/Notes</h2>
      <h1 class="title-font sm:text-2xl text-xl font-medium text-white mb-3">${todoObj[key].title}</h1>
      <p class="leading-relaxed mb-3">${todoObj[key].desc}</p>
      <div class="deleteOrUpdateContainer flex justify-around">
      <a href="http://localhost:5500/edit.html?key=${key}">
      <button name="${key}" 
        class="text-green-400 text-sm md:text-lg px-8 inline-flex font-bold items-center border border-gray-400 mt-2 rounded-xl p-2">Edit
      </button>
      </a>
      <button name="${key}" 
        class="deleteBtn ml-1 text-sm md:text-lg text-green-400 px-8 inline-flex font-bold items-center border border-gray-400 mt-2 rounded-xl p-2">Trash
      </button>
    </div>
      <div class="text-center mt-2 leading-none flex justify-center absolute bottom-0 left-0 w-full py-4">
        <span
          class="text-gray-400 mr-3 inline-flex items-center leading-none text-sm pr-3 py-1 border-r-2 border-gray-700 border-opacity-50">
          Added At : ${todoObj[key].time}
        </span>
      </div>
    </div>
  </div>
  </div>`
    allTodoContainer.innerHTML += maketodo


  }

disable_Button.style.display = 'none'

const deleteTodoBtn = document.getElementsByClassName('deleteBtn')
let getDeleteTodos = JSON.parse(localStorage.getItem("deletedTodos"))
Array.from(deleteTodoBtn).forEach((e) => {
  e.addEventListener('click', ((e) => {
    showDeleted.innerHTML += `<div class="bg-indigo-900 text-center py-4 lg:px-4">
    <div class="p-2 bg-indigo-800 items-center text-indigo-100 leading-none lg:rounded-full flex lg:inline-flex" role="alert">
    <span class="flex cursor-pointer rounded-full bg-indigo-500 uppercase px-2 py-1 text-xs font-bold mr-3">Success</span>
    <span class="font-semibold mr-2 text-left flex-auto">One item successfully deleted.</span>
      <svg class="fill-current opacity-75 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M12.95 10.707l.707-.707L8 4.343 6.586 5.757 10.828 10l-4.242 4.243L8 15.657l4.95-4.95z"/></svg>
    </div>
  </div>`
    setTimeout(() => {
      showDeleted.innerHTML = ''
    }, 5000);
    let deleteObj = {}
    let obj = todoObj[e.target.name]
    deleteObj[e.target.name] = obj
    if (!getDeleteTodos) {
      localStorage.setItem('deletedTodos', JSON.stringify(deleteObj))
    }
    else {
      getDeleteTodos[e.target.name] = obj
      localStorage.setItem('deletedTodos', JSON.stringify(getDeleteTodos))
    }
    //  deleteObj[]

    delete todoObj[e.target.name]
    localStorage.setItem('todoObj', JSON.stringify(todoObj))
    location.reload()
  }))
})

// let todoObj = {
//   96.65010056054993: { 'shyam bhai': "is the best in the world" }
// }
