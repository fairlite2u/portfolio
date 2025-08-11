export default class ToDoList {
    constructor() {
        this._list = [];
    }

    getList() {
        return this._list;
    }

    clearList() {
        this._list = [];
    }

    addItemToList(itemObj) {
        this._list.push(itemObj);
    }

    // removeItemFromList(id) {
    //     const list = this._list;
    //     for (let i = 0; i < list.length; i++) {
    //         if (list[i]._id == id) {
    //             list.splice(i, 1);
    //             break;
    //         }
    //     }
    // }
    
    // Modified about method to only remove certain list items
    removeCheckedFromList(id) {
        const list = this._list;
        list.splice(id, 1);
    }

    // Add method to cross out items on list
    crossoutItemOnList(id) {
        const item = document.getElementById(id).nextElementSibling;
        item.classList.toggle('checked');
    }
}