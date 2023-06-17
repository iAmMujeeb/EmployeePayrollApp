window.addEventListener('DOMContentLoaded', (event) => {
    createInnerHtml();
});

//Template literal ES6 feature
const createInnerHtml = () => {
    const innerHtml = `
    <tr>
    <th>/th>
    <th>Name</th>
    <th>Gender</th>
    <th>Department</th>
    <th>salary</th>
    <th>Start Date</th>
    <th>ACTIONS</th>
    </tr>
    <tr>
    <td><img class="profile" src="logo.png" alt=""></td>
    <td>Narayan Manadevan</td> 
    <td>Male</td>
    <td><div class='dept-label'>HR</div><div class='dept-label'>Finance</div></td> 
    <d>3000000</td>
    <td>1 Nov 2020</td> 
    <td>
    <img name="1" onclick="remov(this)" src="delete_icon.jpg" alt="delete"> 
    <img name="1" onclick="update(this)" src="edit_icon.jpg" alt="edit">
    </td>
    </tr>
    `;
    document.querySelector('#table-display').innerHTML = innerHtml;
}

window.addEventListener('DOMContentLoaded', (event) => {
    createInnerHtml1();
});

const createInnerHtml1 = () => {
    const headerHtml = "<th></th><th>Name</th><th>Gender</th><th>Department</th>" +
        "<th>Salary</th><th>Start Date</th><th>Actions</th>";

    let innerHtml = `${headerHtml}`;
    let empPayrollList = createEmployeePayrollJSON();
    for (const empPayrollData of empayrollList) {
        innerHtml = `${innerHtml}
        <tr>
        <td><img class="profile" src="${empPayrollData._profilePic}" alt=""></td> <td>${empPayrollData._name}</td> 
        <td>${empPayrollData._gender}</td> 
        <td>${getDeptHtml(empPayrollData._department)}</td> 
        <td>${empPayrollData._salary}</td> 
        <td>${empPayrollData._startDate}</td> 
        <td>
        <img name="${empPayrollLiData._id}" onclick="remove(this)"
        src="delete_icon.jpg" alt="delete"> 
        <img name="${empPayrollData._id}" onclick="update(this)"
        src="edit_icon.jpg" alt="edit">
        </td> 
        </tr>
        `;
    }
    document.querySelector('#table-display').innerHTML = innerHtml;
}

let empPayrollList;
window.addEventListener('DOMContentLoaded', (event) => {
    empPayrollList = getEmployeePayrollDataFromStorage();
    document.querySelector(".emp-count").textContent = empPayrollList.length;
    createInnerHtml2();
    localStorage.removeItem('editEmp');
});

const getEmployeePayrollDataFromStorage = () => {
    return localStorage.getItem('EmployeePayrollList') ?
        JSON.parse(localStorage.getItem('EmployeePayrollList')) : [];
}

const createInnerHtml2 = () => {
    const headerHtml = "<th></th><th>Name</th><th>Gender</th><th>Department</th>" +
        "<th>Salary</th><th>Start Date</th><th>Actions</th>";
    if (empPayrollList.length == 0) return;
    let innerHtml = `${headerHtml}`;
    for (const empPayrollData of empPayrollList) {
        innerHtml = `${innerHtml}
<tr>
<td><img class="profile" src="${empPayrollData._profilePic}" alt="'"></td> <td>${empPayrollData._name}</td> 
<td>${empPayrollData._gender}</td> 
<td>${getDeptHtml(empPayrollData._department)}</td> 
<td>${empPayrollData._salary}</td> 
<td>${stringifyDate(empPayrollData._startDate)}</td>
<img id="${empPayrollData._id}" onclick="remove(this)" src="delete_icon.jpg" alt="delete"> 
<img id="${empPayrollData._id}" onclick="update(this)" src="edit_icon.jpg" alt="edit">
</td> 
</tr>
`;
    }
    document.querySelector('#table-display').innerHTML = innerHtml;
}

const checkForUpdate = () => {
    const employeePayrollJson = localStorage.getItem('editEmp');
    isUpdate = employeePayrollJson ? true : false;
    if (!isUpdate) return;
    employeePayrollObj = JSON.parse(employeePayrollJson);
    setForm();
}

const setForm = () => {
    setValue('#name', employeePayrollObj._name);
    setSelectedValues('[name=profile]', employeePayrollObj._profilePic);
    setSelectedValues('[name=gender]', employeePayrollObj._gender);
    setSelectedValues('[name=department]', employeePayrol10bj._department);
    setValue('#salary', employeePayrollobj._salary);
    setTextValue('.salary-output', employeePayroll0bj._salary);
    setValue('#notes', employeePayroll0bj._note);
    let date = stringifyDate(employeePayrollObj._startDate).split(" ");
    setValue('#day', date[0]);
    setValue('#month', date[1]);
    setValue('#year', date[2]);
}

const setSelectedValues = (propertyValue, value) => {
    let allItems = document.querySelectorAll(propertyValue);
    allItems.forEach(item => {
        if (Array.isArray(value)) {
            if (value.includes(item.value)) {
                item.checked = true;
            }
        }
        else if (item.value === value)
            item.checked = true;
    });
}

const save = (event) => {
    event.preventDefault();
    event.stopPropagation();
    try {
        setEmployeePayroll0bject();
        createAndUpdateStorage();
        resetForm();
        window.location.replace(site_properties.home_page);
    } catch (e) {
        return;
    }
}

const setEmployeePayrollobject = () => {
    employeePayrollObj._name = getInputValueById('#name');
    employeePayrollobj._profilePic = getSelectedValues('[name=profile]').pop();
    employeePayroll0bj._gender = getSelectedValues(' [name=gender]').pop();
    employeePayrollObj._department = getSelectedValues(' [name=department]');
    employeePayrollObj._salary = getInputValueById('#salary');
    employeePayrollObj._note = getInputValueById('#notes');
    let date = getInputValueById('#day') + " " + getInputValueById('#month') + ""
    getInputValueById('#year');
    employeePayrollObj._startDate = date;
}

const createAndUpdateStorage = () => {
    let employeePayrollList = JSON.parse(localStorage.getItem("EmployeePayrollList"));
    if (employeePayrollList) {
        let empPayrollData = employeePayrollList.
            find(empData => empData._id == employeePayrollObj._id);
        if (!empPayrollData) {
            employeePayrollList.push(createEmployeePayrollData());
        } else {
            const index = employeePayrollList
                .map(empData => empData._id)
                .indexOf(empPayrollData._id);
            employeePayrollList.splice(index, 1,
                createEmployeePayrollData(empayrollData._id));
        }
    } else {
        employeePayrollList = [createEmployeePayroliData()]
    }
    localStorage.setItem("EmployeePayrollList", JSON.stringify(employeePayrollList))
}
const createEmployeePayrollData = (id) => {
    let employeePayrollData = new EmployeePayrollData();
    if (!id) employeePayrollData.id = createNewEmployeeId();
    else employeePayrollData.id = id;
    setEmployeePayrollData(employeePayrollData);
    return employeePayrollData;
}

const setEmployeePayrollData = (employeePayrollData) => {
    try {
        employeePayrollData.name = employeePayrollObj._name;
    } catch (e) {
        setTextValue('.text-error', e);
        throw e;
    }
    employeePayrollData.profilePic = employeePayrollObj._profilePic;
    employeePayrollData.gender = employeePayrollObj._gender;
    employeePayrollData.department = employeePayrollObj._department;
    employeePayrollData.salary = employeePayrollObj._salary;
    employeePayrollData.note = employeePayrollObj._note;
    try {
        employeePayrollData.startDate =
            new Date(Date.parse(employeePayrollObj._startDate));
    } catch (e) {
        setTextValue('.date-error', e);
        throw e;
    }
    alert(employeePayrollData.toString());
}

const createNewEmployeeId = () => {
    let empID = localStorage.getItem("EmployeeID");
    empID = !empID ? 1 : (parseInt(empID) + 1).toString();
    localStorage.setItem("EmployeeID", empID);
    return empID;
}

const getSelectedValues = (propertyValue) => {
    let allItems = document.querySelectorAll(propertyValue);
    let selItems = [];
    allItems.forEach(item => {
        if (item.checked) selItems.push(item.value);
    });
    return selItems;
}

const update = (node) => {
    let empPayrollData = empPayrollList.find(empData => empData._id == node.id);
    if(!empPayrollData) return;
    localStorage.setItem('editEmp', JSON.stringify(empPayrollData));
window.location.replace(site_properties.add_emp_payroll_page);
}