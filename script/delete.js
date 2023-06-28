let deletedTodos = JSON.parse(localStorage.getItem('deletedTodos'))
const allTodoContainer = document.getElementById("allTodoContainer")
const nullOrNot = document.querySelector('.nullOrNot')
let disable_Button = document.getElementById('btn')
let showDeleted = document.querySelector('.showDeleted')
if (!deletedTodos) {
  nullOrNot.innerHTML += `<span  class="text-[2rem]  font-bold">Deleted :- No Todos</span>`
}
else if (Object.keys(deletedTodos).length == 0 ? nullOrNot.innerHTML += `<span  class="text-[2rem]  font-bold">Deleted :- No Todos</span>` : nullOrNot.innerHTML += `<span  class="text-[2rem]  font-bold">Deleted Todos </span>`)


  

  // if (deleteTodo) {
  for (const key in deletedTodos) {

    let maketodo = `<div class="md:px-4 lg:w-1/3 pb-7">
  <div
    class="h-full bg-gray-800 bg-opacity-40 md:px-8 pt-16 pb-24 rounded-lg overflow-hidden text-center relative">
    <h2 class="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">Todo/Notes</h2>
    <h1 class="title-font sm:text-2xl text-xl font-medium text-white mb-3">${deletedTodos[key].title}</h1>
    <p class="leading-relaxed mb-3">${deletedTodos[key].desc}</p>
    <div class="deleteOrUpdateContainer flex justify-around">
    <a href="http://localhost:5500/edit.html?key=${key}"><button name="${key}"
      class="text-[12px] text-green-400 px-3 inline-flex font-bold items-center border border-gray-400 mt-2 rounded-xl p-2">Edit
    </button></a>
    <button id=${key}  href="{val.url}"
      class="text-[12px] publishTodo text-green-400 px-2 inline-flex font-bold items-center border border-gray-400 mt-2 rounded-xl md:text-lg p-2">Add Todo
    </button>
    <button name="${key}" href="{val.url}"
      class="text-[12px] deleteTodo md:text-lg text-green-400 px-3 inline-flex font-bold items-center border border-gray-400 mt-2 rounded-xl p-2">Delete
    </button>
  </div>
    <div class="text-center mt-2 leading-none flex justify-center absolute bottom-0 left-0 w-full py-4">
      <span
        class="text-gray-400 mr-3 inline-flex items-center leading-none text-sm pr-3 py-1 border-r-2 border-gray-700 border-opacity-50">
        Added At : ${deletedTodos[key].time}
      </span>
    </div>
  </div>
  </div>
  </div>`
    allTodoContainer.insertAdjacentHTML('beforeend', maketodo)
  }
// }
disable_Button.style.display = 'none'


let deleteTodo = document.getElementsByClassName('deleteTodo')
Array.from(deleteTodo).forEach((element) => {
  element.addEventListener("click", (e) => {
   
    let getTodosFromDeleteObj = JSON.parse(localStorage.getItem('deletedTodos'));
    delete getTodosFromDeleteObj[e.target.name]
    localStorage.setItem('deletedTodos', JSON.stringify(getTodosFromDeleteObj))
    location.reload()
     showDeleted.innerHTML += `<div class="bg-indigo-900 text-center py-4 lg:px-4">
  <div class="p-2 bg-indigo-800 items-center text-indigo-100 leading-none lg:rounded-full flex lg:inline-flex" role="alert">
  <span class="flex cursor-pointer rounded-full bg-indigo-500 uppercase px-2 py-1 text-xs font-bold mr-3">Success</span>
  <span class="font-semibold mr-2 text-left flex-auto">One item permanently deleted.</span>
    <svg class="fill-current opacity-75 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M12.95 10.707l.707-.707L8 4.343 6.586 5.757 10.828 10l-4.242 4.243L8 15.657l4.95-4.95z"/></svg>
  </div>
</div>`
    setTimeout(() => {
      showDeleted.innerHTML = ''
    }, 5000);
  })
})

// publish todo form draft 
let publishTodo = document.getElementsByClassName('publishTodo')
Array.from(publishTodo).forEach((element) => {
  element.addEventListener("click", (e) => {
    let GetUserTodos = JSON.parse(localStorage.getItem('todoObj'));
    let getTodosFromDelete = JSON.parse(localStorage.getItem('deletedTodos'));
    GetUserTodos[e.target.id] = getTodosFromDelete[e.target.id]
    localStorage.setItem('todoObj', JSON.stringify(GetUserTodos))
    delete getTodosFromDelete[e.target.id]
    localStorage.setItem('deletedTodos', JSON.stringify(getTodosFromDelete))
    location.reload()
  })
})

