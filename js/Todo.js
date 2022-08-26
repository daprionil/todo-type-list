export default class Todo{
    constructor(){
        this.todoList = [];
    };
    
    //Agregar un Elemento al Todo
    addTodo(todoItem){
        this.todoList = [...this.todoList, todoItem];
    };

    //Eliminar un Dato del Todo
    deleteTodo({id}){
        this.todoList = this.todoList.filter( item => item.id !== id);
        console.log(this.todoList);
    };

    //Editar un Dato del Todo
    editTodo(todoItem){
        this.todoList = this.todoList.map( todo => {
            if(todo.id === todoItem.id){
                return todoItem;
            };
            return todo;
        });
    };
};