var addEmployees = function (event) {
    // var elem = event.target;
    createForm();
}

function createForm() {
    var form = document.createElement("form");
    form.setAttribute("name", "add new employee");
    form.setAttribute("action", "google.com");
    createInput(form, "First name");
    createInput(form, "Last name");
    createInput(form, "Salary");
    createInput(form, "Position");
    createButton(form);
    document.body.appendChild(form);
}
function createInput(form, name) {
    var input = document.createElement("input");
    input.classList.add("newEmployee");
    input.setAttribute("name", name);
    input.setAttribute("type", "text");
    input.setAttribute("placeholder", name);
    form.appendChild(input);
}

function getClassList() {
    var liArr = document.querySelector('ul.employeeList>li');
    var spanArr = liArr.querySelectorAll('span');
    var spanClassList = [];
    for (var i = 0; i < spanArr.length; i++) {
        spanClassList.push(spanArr[i].className);
    }
    return spanClassList;
}

function createSpan(newEmployeeLi, spanClassList) {
    var newSpan = document.createElement('span');
    newSpan.classList.add(spanClassList);
    newEmployeeLi.appendChild(newSpan);
    return newSpan;
}

function isDuplicate(inputArr) {
    var isDuplicate = false;
    var existedLis = document.querySelectorAll('ul.employeeList>li');
    var firstName = inputArr[0].value;
    var lastName = inputArr[1].value;
    for (var i = 0; i < existedLis.length; i++) {
        existedSpans = existedLis[i].querySelectorAll('span');
        if (firstName == existedSpans[0].innerText.trim() && lastName == existedSpans[1].innerText.trim()) {
            isDuplicate = true;
            alert('New employee is duplicate!')
        }
    }
    return isDuplicate;
}

function addEmployeeLi(form) {
    allRight = true;
    inputArr = form.getElementsByClassName("newEmployee");
    if (isDuplicate(inputArr)) {
        return !allRight;
    }
    var spanClassList = getClassList();
    var userList = document.querySelector('ul.employeeList');
    var newEmployeeLi = document.createElement('li');
    userList.appendChild(newEmployeeLi);
    for (i = 0; i < inputArr.length; i++) {
        if (i == 2) {
            var newSpan = createSpan(newEmployeeLi, spanClassList[i]);
            newSpan.innerHTML = " $ " + inputArr[i].value;
        }
        else {
            var newSpan = createSpan(newEmployeeLi, spanClassList[i]);
            newSpan.innerHTML = " " + inputArr[i].value;
        }
    }
    return allRight;
}

function createButton(form) {
    for (var i = 0; i < 2; i++) {
        var button = document.createElement("input");
        if (i == 0) {
            button.setAttribute("value", "Save");
            button.setAttribute("type", "submit");
            button.setAttribute("id", "btnSave");
            button.addEventListener("click", function (e) {
                e.preventDefault();
                if (checkLimitOfUsers() && checkAverageSalary()) {
                    if (validateName(form)) {
                        if (addEmployeeLi(form)) {
                            updateInfoRow();
                            removeForm(form);
                        }
                    }
                }
            });
            form.appendChild(button);
        } else {
            button.setAttribute("value", "Cancel");
            button.setAttribute("type", "submit");
            button.setAttribute("id", "btnCancel");
            button.addEventListener("click", function (event) {
                event.preventDefault();
                removeForm(form);
            });
            form.appendChild(button);
        }
        ;
    }
}

function checkAverageSalary() {
    existedAverageSalary = document.getElementById('average').innerText;
    if (existedAverageSalary < 2000) {
        return true;
    } else {
        alert('Limit of Average Salary is 2000$! You can not add new users!');
    }
}

function checkLimitOfUsers() {
    existedLimit = document.getElementById('limit').innerText;
    rowCount = getUsersCount();
    if (rowCount < existedLimit) {
        return true;
    } else {
        alert('Limit of users: ' + existedLimit + '.  You can not entered more.');
    }
}

function validateName(form) {
    var isValid = true;
    var userNamePattern = /^([A-Z])\w+/g;
    var valueFirstName = form.childNodes[0].value;
    var valueSecondName = form.childNodes[1].value;
    if (valueFirstName === '' || valueSecondName === '') {
        alert('Name or surname are empty!');
        isValid = false;
        return;
    }
    if (!valueFirstName.match(userNamePattern) || !valueSecondName.match(userNamePattern)) {
        alert('Name or surname should begin with a capital letter.');
        isValid = false;
    }
    return isValid;
}

function removeForm(form) {
    form.remove();
}

function getUsersCount() {
    var employeesEl = document.querySelectorAll('ul.employeeList>li');
    return employeesEl.length;
}

function countAverageSalary() {
    var averageSalary = 0;
    var employeesEl = document.querySelectorAll('ul.employeeList>li>span.employeeSalary');
    for (var i = 0; i < employeesEl.length; i++) {
        var $spanSalary = employeesEl[i];
        averageSalary += parseInt($spanSalary.textContent.replace('$ ', ''));
    }
    return Math.round(averageSalary / getUsersCount());
}

function updateInfoRow() {
    document.getElementById('average').innerText = countAverageSalary();
    document.getElementById('count').innerText = getUsersCount();
    document.getElementById('limit').innerText = localStorage.getItem('limit');
}

function init() {
    if (!localStorage.getItem('limit')) {
        localStorage.setItem('limit', 10);
    }
    updateInfoRow();
}

var setLimitOfUsers = function (event) {
    var limitOfUsers = prompt('Enter limit of users:');
    if (limitOfUsers > 10) {
        alert('Limit of emoloyee are 10. You can not enter more.');
    } else {
        localStorage.setItem('limit', limitOfUsers);
        document.getElementById('limit').innerText = limitOfUsers;
    }
}


init();

edit.onclick = setLimitOfUsers;

addEmployee.onclick = addEmployees;
