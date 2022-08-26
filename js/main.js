import Todo from './Todo.js';
import UI from './UI.js';

let todo;
const ui = new UI();

let modo = false;
//Variables
const form = document.querySelector('#form-todo');

const objTodo = {
    titleTodo: '',
    textTodo: '',
    typeTodo: ''
};
//Eventos
document.addEventListener('DOMContentLoaded', () => {
    //Footer Copy
    ui.footerCopy();
    //Local Storage Todo
    todo = getStorageTodo() ?? new Todo();
    //Evento para el Formulario
    form.addEventListener('submit', addTodoType);
    //Agregar Eventos para los Campos del Formulario
    allEventForm();
    //Mostrar los Elementos Actuales en la Lista de Todo
    ui.viewAllTodos(todo);
});

//Funciones
function addTodoType(evt){
    //Detener la Acción por default
    evt.preventDefault();

    //Validar los campos, excepto el id en caso de que ya tenga la propiedad
    const validate = Object.entries(objTodo).some( ([i,val]) =>  {
        return i === 'id' ?
               false:
               val === '';
    });
    if(validate){
        ui.message({m:'Todos los campos son requeridos'});
        return;
    };

    //Modo Edición
    if(modo){
        //Si aún no ha cambiado el typeTodo
        if(!(typeof objTodo.typeTodo === 'object')){
            objTodo.typeTodo = changeType(objTodo.typeTodo);
        };

        //Editar y mostrar los cambios de listTodo en el HTML
        todo.editTodo({...objTodo});
        ui.viewAllTodos(todo);
        ui.message({m: 'Nota Editada Correctamente', type: 'correct'});

        //Setear el localStorage
        setStorageTodo(todo);

        modo = false;
        evt.target.reset();
        resetObjTodo();

        //Regresando el Botón a su estado
        const btnSubmit = form.querySelector('input[type="submit"]');
        btnSubmit.value = 'Aceptar';
        btnSubmit.classList.toggle('mode-form');
        
        return;
    };
    
    //Ajustes previos para agregar el todo
    objTodo.id = Date.now();
    objTodo.typeTodo = changeType(objTodo.typeTodo);

    //Agregar el Elemento al TodoList
    /**
     * Asignamos una copia, ya que si pasamos una variable, se almacenará
     * el valor en la dirección de Memoria de la misma.
     */
    todo.addTodo({...objTodo});
    ui.viewAllTodos(todo);
    ui.message({m: 'Agregado Correctamente', type: 'correct'});
    setStorageTodo(todo)
    //Resetear Formulario
    evt.target.reset();
    resetObjTodo();
};

//Rellenando Eventos para los campos del Formulario
function allEventForm(){
    for(let input of form){
        if(input.type === 'submit') continue;
        input.addEventListener('input', addDataTodo);
    };
};

//Llenando el Objeto Global del Todo
function addDataTodo(evt){
    objTodo[evt.target.name] = evt.target.value;
};

//Resetear Objeto Global
function resetObjTodo(){
    for(let val in objTodo){
        objTodo[val] = '';
    };
};

//Cambiar Emoji en TypeTodo
function changeType(type){
    let emoji;

    switch (type) {
        case 'Universidad':
            emoji = '🎓';
            break;
        case 'Compras':
            emoji = '💲';
            break;
        case 'Pagos':
            emoji = '📊';
            break;
        case 'Tareas':
            emoji = '📝';
            break;
        case 'Diario':
            emoji = '📚';
            break;
        case 'Otro':
            emoji = '🎲';
            break;
        default:
            break;
    };

    return {type,emoji};
};

//Recibir el la información del local Storage
function getStorageTodo(){
    let val;
    const todoGet = JSON.parse(localStorage.getItem('todos'));

    if(todoGet) {
        val = new Todo();
        val.todoList = todoGet.todoList;
    };

    return todoGet ?
           val     :
           null;
};

//Agregar las lista de Todos al LocalStorage
function setStorageTodo(item){
    localStorage.setItem('todos',JSON.stringify(item));
};

//Elimina el elemento por Id del TodoList
function delTodoItem(todoItem){
    //Elimina de la lista de Valores
    todo.deleteTodo(todoItem);
    //Muestra la lista de Todo
    ui.viewAllTodos(todo);
    setStorageTodo(todo);
};

//Modo Edición para 
function editTodoItem(todoItem){
    modo = true;
    
    //Mostrar Valores
    viewDataTodoForm(todoItem);
    //llenarEl Objeto
    setDataObjTodo(todoItem);

    //Cambiar el estilo del Botón
    const btnSubmit = form.querySelector('input[type="submit"]');
    btnSubmit.value = 'Editar';
    btnSubmit.classList.toggle('mode-form');
};

//Mostrar los datos en el formulario
function viewDataTodoForm(todoItem){
    for(let i = 0; i < form.length; i++){
        if(form[i].type === "submit") continue;
        //Cuando el input es typeTodo
        if(form[i].name === 'typeTodo'){
            form[i].value = todoItem[form[i].name]['type'];
            continue;
        };
        //Otro input
        form[i].value = todoItem[form[i].name];
    };
};

//Llenar el Objeto Global objTodo al Editar
function setDataObjTodo(todoItem){
    //Itera sobre el todoItem param y llena el objTodo Global
    for(const item in todoItem){
        objTodo[item] = todoItem[item];
    };
};

//Exportar Funciones
export {
    delTodoItem,
    editTodoItem
}