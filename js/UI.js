import {delTodoItem, editTodoItem} from './main.js';

const ctnTodos = document.querySelector('#list-todo-types');

export default class UI{
    //Mostrar los Elementos del Todo List en el HTML
    viewAllTodos({todoList}){
        //Eliminar el HTML previo
        this.#delHtmlTodo();
        //Fragmento para Almacenar los elementos
        const frag = document.createDocumentFragment();

        //Cuando no hay elementos en la lista
        if(todoList.length === 0){
            const nothing = document.createElement('div');
            nothing.classList.add('ctn-nothing');
            nothing.textContent = 'No tienes notas, ¡Agrega Una!'
            //Agregando al fragmento
            frag.appendChild(nothing);
        };

        //Recorre la lista
        if(todoList.length > 0){
            todoList.forEach( todo => {
                //Destructuring de Valores
                const { textTodo, titleTodo, typeTodo:{type,emoji}} = todo;

                //Elemento HTML por Todo
                const todoHtml = document.createElement('div');
                todoHtml.classList.add('item-todo');
                todoHtml.innerHTML = `
                <p class="title-todo">${titleTodo}</p>
                <p class="descrip-todo">${textTodo}</p>
                <div class="ctn-others">
                    <div class="ctn-img-type">
                        <p class="text-type">${type}</p>
                        <p class="img-type">${emoji}</p>
                    </div>
                    <div class="ctn-actions">
                        <button class="edit-todo">Edit</button>
                        <button class="delete-todo">Del</button>
                    </div>
                </div>`;
                //Botones para las Acciones de Cada Todo
                const btnDel = todoHtml.querySelector('.delete-todo'),
                      btnEdit = todoHtml.querySelector('.edit-todo');
                
                btnDel.onclick = () => delTodoItem(todo);
                btnEdit.onclick = () => editTodoItem(todo);
                
                frag.insertBefore(todoHtml, frag.firstChild);
            });
        };

        //Agrega el Fragemento al HTML
        ctnTodos.appendChild(frag);
    };
    //Eliminar el HTML del ctn de Todos
    #delHtmlTodo(){
        while(ctnTodos.firstChild){
            ctnTodos.firstChild.remove();
        };
    };
    //Mensaje en HTML
    message({m,type = ''}){
        //Eliminar el mensaje
        this.#removeMessage();

        //Crear el HTML para el mensaje
        const msg = document.createElement('div');
        msg.textContent = m;
        msg.className = 'message';

        //Validar el Tipo de mensaje
        if(type === ''){
            msg.classList.add('alert');
        }else{
            msg.classList.add('success');
        };

        //Agregar el Elemento al HTML
        const ctn = document.querySelector('#form-todo');
        ctn.insertBefore(msg,ctn.lastChild.previousElementSibling);

        //Eliminar el elemento luego del Tiempo Indicado
        setTimeout(() => {
            msg.remove();
        }, 4000);
    };

    //Eliminar el mensaje
    #removeMessage(){
        const m = document.querySelector('#form-todo .message');
        if(m) m.remove();
    };

    //Footer Copy Relative Year
    footerCopy(){
        const copyHtml = document.querySelector('#data-copy');
        copyHtml.textContent = `© ${new Date().getFullYear()}`;
    };
};