const addListBtnElement = document.getElementById('add-list-btn');
const addListModalElement = document.getElementById('add-list-modal');
const backdropElement = document.getElementById('backdrop');
const addListCancelBtnElement = document.getElementById('add-list-cancel-btn');
const input = addListModalElement.querySelector('input');
const addListProceedBtnElement = document.getElementById(
  'add-list-proceed-btn'
);
const listItems = document.querySelector('ul');
const initialSectionElement = document.querySelector('.initial-text');
const confirmDeleteModalElement = document.getElementById(
  'delete-confirmation-modal'
);
const cancelDeleteBtn = document.getElementById('delete-cancel-btn');
let proceedDeleteBtn = document.getElementById('delete-proceed-btn');

const list = [];

const showInitialSection = () => {
  if (listItems.children.length === 0) {
    initialSectionElement.classList.remove('hide');
  } else {
    initialSectionElement.classList.add('hide');
  }
};

const hideInitialSection = () => {
  initialSectionElement.classList.add('hide');
};

const clearInput = () => {
  input.value = '';
};

const toggleBackdrop = () => {
  backdropElement.classList.toggle('visible');
  backdropElement.classList.toggle('hide');
};

const showAddListModalHandler = () => {
  addListModalElement.classList.remove('hide');
  addListModalElement.classList.add('visible');
  toggleBackdrop();
};

const closeAddListModalHandler = () => {
  addListModalElement.classList.remove('visible');
  addListModalElement.classList.add('hide');
  toggleBackdrop();
};

const openDeleteModalHandler = () => {
  confirmDeleteModalElement.classList.remove('hide');
  confirmDeleteModalElement.classList.add('visible');
};

const closeDeleteModalHandler = () => {
  confirmDeleteModalElement.classList.remove('visible');
  confirmDeleteModalElement.classList.add('hide');
};

const backdropHandler = () => {
  closeAddListModalHandler();
  clearInput();
  showInitialSection();
  closeDeleteModalHandler();
};

const addListCancelBtnHandler = () => {
  backdropHandler();
};

const cancelDeleteHandler = () => {
  backdropHandler();
};

const deleteItemHandler = itemId => {
  let itemIndex = 0;
  for (const itemss of list) {
    if (itemss.id === itemId) {
      break;
    }
    itemIndex++;
  }
  list.splice(itemIndex, 1);
  listItems.children[itemIndex].remove();
  backdropHandler();
};

const startDeleteItemHandler = itemId => {
  openDeleteModalHandler();

  proceedDeleteBtn.replaceWith(proceedDeleteBtn.cloneNode(true));

  proceedDeleteBtn = document.getElementById('delete-proceed-btn');

  proceedDeleteBtn.addEventListener(
    'click',
    deleteItemHandler.bind(this, itemId)
  );
  toggleBackdrop();
};

const addNewList = (id, item) => {
  const newList = document.createElement('li');
  newList.className = 'list-item-lists';
  newList.innerHTML = `<h4 id="list-title">${item}</h4>
    <div class="icons-containers">
    <i class="far fa-check-circle margin-right"></i>
    <i class="far fa-trash-alt" id="this-btn"></i>
    </div>`;

  const h4 = newList.querySelector('h4');
  const doneBtn = newList.querySelector('.fa-check-circle');
  const deleteItemBtn = newList.querySelector('.fa-trash-alt');

  doneBtn.addEventListener('click', () => {
    if (h4.style.textDecoration === 'line-through') {
      h4.style.textDecoration = 'none';
    } else {
      h4.style.textDecoration = 'line-through';
    }
  });

  deleteItemBtn.addEventListener(
    'click',
    startDeleteItemHandler.bind(this, id)
  );

  listItems.append(newList);
};

const getUserInput = () => {
  const newItem = input;

  if (newItem.value.trim() === '') {
    alert('Please enter an item!');
    return;
  }

  const toDoList = {
    id: Math.random().toString(),
    newInput: newItem.value.trim()
  };

  list.push(toDoList);
  addNewList(toDoList.id, toDoList.newInput.toUpperCase());
  backdropHandler();
  hideInitialSection();
};

addListBtnElement.addEventListener('click', showAddListModalHandler);
backdropElement.addEventListener('click', backdropHandler);
addListCancelBtnElement.addEventListener('click', addListCancelBtnHandler);
addListProceedBtnElement.addEventListener('click', getUserInput);
cancelDeleteBtn.removeEventListener('click', cancelDeleteHandler);
cancelDeleteBtn.addEventListener('click', cancelDeleteHandler);
