
let allTodoContainer = document.getElementById("allTodoContainer")
let todoDraftObj = JSON.parse(localStorage.getItem('todoDraft'))
const nullOrNot = document.querySelector('.nullOrNot')
let disable_Button = document.getElementById('btn')

if (!todoDraftObj) {
  nullOrNot.innerHTML += `<span  class="text-[2rem]  font-bold">Draft :- No Todos</span>`
}
else if (Object.keys(todoDraftObj).length == 0 ? nullOrNot.innerHTML += `<span  class="text-[2rem]  font-bold">Draft :- No Todos</span>` : nullOrNot.innerHTML += `<span  class="text-[2rem]  font-bold">Draft Todos </span>`)

for (const key in todoDraftObj) {
  let maketodo = `<div class="p-4 lg:w-1/3">
    <div
      class="h-full bg-gray-800 bg-opacity-40 md:px-8 pt-16 pb-24 rounded-lg overflow-hidden text-center relative">
      <h2 class="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">Todo/Notes</h2>
      <h1 class="title-font sm:text-2xl text-xl font-medium text-white mb-3">${todoDraftObj[key].title}</h1>
      <p class="leading-relaxed mb-3">${todoDraftObj[key].desc}</p>
      <div class="deleteOrUpdateContainer flex justify-around">
      <a href="http://localhost:5500/edit.html?key=${key}"><button name="${key}" 
        class="text-green-400 text-[12px] md:text-lg px-3 inline-flex font-bold items-center border border-gray-400 mt-2 rounded-xl py-2">Edit
      </button></a>
      <button id=${key}  href="{val.url}"
        class="publishTodo text-[12px] md:text-lg text-green-400 px-2 inline-flex font-bold items-center border border-gray-400 mt-2 rounded-xl py-2">Add Todo
      </button>
      <button name="${key}" href="{val.url}"
        class="deleteTodo text-[12px] md:text-lg text-green-400 px-3 inline-flex font-bold items-center border border-gray-400 mt-2 rounded-xl py-2">Delete
      </button>
    </div>
      <div class="text-center mt-2 leading-none flex justify-center absolute bottom-0 left-0 w-full py-4">
        <span
          class="text-gray-400 mr-3 inline-flex items-center leading-none text-sm pr-3 py-1 border-r-2 border-gray-700 border-opacity-50">
          Added At : ${todoDraftObj[key].time}
        </span>
      </div>
    </div>
  </div>
  </div>`
  allTodoContainer.innerHTML += maketodo

}
disable_Button.style.display = 'none'
let deleteTodo = document.getElementsByClassName('deleteTodo')
Array.from(deleteTodo).forEach((element) => {
  element.addEventListener("click", (e) => {
    let getTodosFromDraft = JSON.parse(localStorage.getItem('todoDraft'));
    delete getTodosFromDraft[e.target.name]
    console.log(getTodosFromDraft);
    localStorage.setItem('todoDraft', JSON.stringify(getTodosFromDraft))
    location.reload()
  })
})

// publish todo form draft 
let publishTodo = document.getElementsByClassName('publishTodo')
Array.from(publishTodo).forEach((element) => {
  element.addEventListener("click", (e) => {
    let GetUserTodos = JSON.parse(localStorage.getItem('todoObj'));
    let getTodosFromDraft = JSON.parse(localStorage.getItem('todoDraft'));
    GetUserTodos[e.target.id] = getTodosFromDraft[e.target.id]
    localStorage.setItem('todoObj', JSON.stringify(GetUserTodos))
    delete getTodosFromDraft[e.target.id]
    localStorage.setItem('todoDraft', JSON.stringify(getTodosFromDraft))
    location.reload()
  })
})

