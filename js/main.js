const KEY = 'son00020';
let contacts = [];
const init = function () {
    if (!localStorage.getItem(KEY)) {
        contacts = contactStarter;
        localStorage.setItem(KEY, JSON.stringify(contacts));
    } else {
        contacts = JSON.parse(localStorage.getItem(KEY));
    }
    updateList();
    document.querySelector('.fab').addEventListener('click', showForm);
    document.querySelector('#button-save').addEventListener('click', addContact);
    document.querySelector('#button-cancel').addEventListener('click', hideForm);
    document.getElementById('button-save-edit').addEventListener('click', updateEdit);


}

const updateList = function () {
    contacts.sort(function (a, b) {
        let nameA = a.fullname.toUpperCase();
        let nameB = b.fullname.toUpperCase();
        if (nameA < nameB) {
            return -1;
        }
        if (nameA > nameB) {
            return 1;
        }
        return 0;
    });
    console.log(contacts);
    let ul = document.querySelector('ul.contacts');
    ul.innerHTML = '';
    let df = new DocumentFragment();
    contacts.forEach((contact) => {
        df.appendChild(createItem(contact));
    });
    ul.appendChild(df);
}

const createItem = function (contact) {
    let li = document.createElement('li');
    li.className = 'contact';
    let spanEdit = document.createElement('span');
    spanEdit.className = 'edit';
    let spanDelete = document.createElement('span');
    spanDelete.className = 'delete';
    spanDelete.setAttribute('data-key', contact.email);
    spanEdit.setAttribute('data-key', contact.fullname);
    spanDelete.addEventListener('click', removeContact);
    spanEdit.addEventListener('click', editContact);

    li.appendChild(spanDelete);
    li.appendChild(spanEdit);

    let h3 = document.createElement('h3');
    h3.textContent = contact.fullname;
    li.appendChild(h3);
    let pe = document.createElement('p');
    pe.className = 'email';
    pe.textContent = contact.email;
    li.appendChild(pe);
    let pp = document.createElement('p');
    pp.className = 'phone';
    pp.textContent = contact.phone;
    li.appendChild(pp);
    return li;


}

const showForm = function (ev) {
    ev.preventDefault;
    console.log(ev.target.className);
    if (ev.target.className == 'fab') {
        document.querySelector('main').style.opacity = '0';
        document.querySelector('.fab').style.opacity = '0';
        document.querySelector('.contactform').style.display = 'block';
        document.getElementById('button-save').style.display = 'inline';


        document.querySelector('.overlay').style.display = 'block';
        document.getElementById('button-save-edit').style.display = 'none';
    } else if (ev.target.className == 'edit') {
        document.querySelector('main').style.opacity = '0';
        document.querySelector('.fab').style.opacity = '0';
        document.querySelector('.contactform').style.display = 'block';
        document.querySelector('.overlay').style.display = 'block';
        document.getElementById('button-save').style.display = 'none';
        document.getElementById('button-save-edit').style.display = 'inline';
    }
    setTimeout(function () {


        document.querySelector('.contactform').classList.add('transform')
    }, 100);

}


const hideForm = function (ev) {
    ev.preventDefault;


    document.querySelector('.contactform').classList.remove('transform');
    setTimeout(function () {


        document.querySelector('.contactform').style.display = 'none';
        document.querySelector('main').style.opacity = '1';
        document.querySelector('.fab').style.opacity = '1';
        document.querySelector('.overlay').style.display = 'none';
        document.querySelector('.contactform form').reset();
    }, 500);
}


const addContact = function (ev) {
    ev.preventDefault;
    let obj = {};
    let fullname = document.getElementById('input-name').value.trim();
    let email = document.getElementById('input-email').value.trim();
    console.log(email);
    let phone = document.getElementById('input-phone').value.trim();
    if (fullname && email && phone) {
        obj = {
            fullname,
            email,
            phone
        };
        contacts.push(obj);
        localStorage.setItem(KEY, JSON.stringify(contacts));
        document.querySelector('.contactform form').reset();
        hideForm(new MouseEvent('click'));
        updateList();
    } else {
        alert('Form not filled in');
    }

}


const removeContact = function (ev) {
    ev.preventDefault();
    let email = ev.target.getAttribute('data-key');
    console.log(email);
    contacts = contacts.filter((contact) => {
        return !(contact.email == email);
    });
    localStorage.setItem(KEY, JSON.stringify(contacts));
    updateList();
}
const editContact = function (ev) {
    ev.preventDefault;
    showForm(ev);
    let fullname = ev.target.getAttribute('data-key');
    let toEditcontact = contacts.filter((contact) => {
        return (contact.fullname == fullname);
    });
    console.log(toEditcontact);
    console.log(toEditcontact[0]);
    document.getElementById('input-name').value = toEditcontact[0].fullname;
    document.getElementById('input-email').value = toEditcontact[0].email;

    document.getElementById('input-phone').value = toEditcontact[0].phone;

}
const updateEdit = function (ev) {
    ev.preventDefault;
    let fullname = document.getElementById('input-name').value.trim();
    contacts = contacts.filter((contact) => {
        return !(contact.fullname == fullname);
    });
    addContact(ev);
    console.log('kkk')

}

document.addEventListener('DOMContentLoaded', init);