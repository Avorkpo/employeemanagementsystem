// Retrieve data from local storage or initialize an empty array
let employees = JSON.parse(localStorage.getItem('employees')) || [];

// Function to render the employee table
function renderEmployeeTable() {
    const table = document.getElementById('employeeTable');
    table.innerHTML = ''; // Clear existing table data

    if (employees.length === 0) {
        table.innerHTML = '<tr><td colspan="8">No data available</td></tr>';
    } else {
        const headerRow = table.insertRow(0);
        const headers = ['ID', 'Name', 'Department', 'Email', 'Phone Number', 'Address', 'Date', 'Actions'];
        headers.forEach(header => {
            const th = document.createElement('th');
            th.textContent = header;
            headerRow.appendChild(th);
        });

        employees.forEach((employee, index) => {
            const row = table.insertRow(index + 1);

            for (const key in employee) {
                const cell = row.insertCell();
                cell.textContent = employee[key];
            }

            const actionsCell = row.insertCell();
            actionsCell.innerHTML = `
                <button onclick="showEditForm(${index})">Edit</button>
                <button onclick="deleteEmployee(${index})">Delete</button>
            `;
        });
    }

    updateEmployeeCount();
}

// Function to update the employee count card
function updateEmployeeCount() {
    document.getElementById('employeeCount').textContent = employees.length;
}

// Function to show the add employee form
function showAddForm() {
    document.getElementById('modalTitle').textContent = 'Add New Employee';
    document.getElementById('editIndex').value = '';
    document.getElementById('employeeForm').reset();
    showModal();
}

// Function to show the edit employee form
function showEditForm(index) {
    const employee = employees[index];
    if (employee) {
        document.getElementById('modalTitle').textContent = 'Edit Employee';
        document.getElementById('editIndex').value = index;
        document.getElementById('id').value = employee.id;
        document.getElementById('name').value = employee.name;
        document.getElementById('department').value = employee.department;
        document.getElementById('email').value = employee.email;
        document.getElementById('phone').value = employee.phone;
        document.getElementById('address').value = employee.address;
        showModal();
    }
}

// Function to hide the modal
function hideModal() {
    document.getElementById('modal').style.display = 'none';
}

// Function to show the modal
function showModal() {
    document.getElementById('modal').style.display = 'block';
}

// Function to handle form submission for adding/editing employees
function handleFormSubmit(event) {
    event.preventDefault();

    const editIndex = parseInt(document.getElementById('editIndex').value);

    if (isNaN(editIndex)) {
        addEmployee();
    } else {
        editEmployee(editIndex);
    }
}

// Add form submission event listener
document.getElementById('employeeForm').addEventListener('submit', handleFormSubmit);

// Function to add a new employee
function addEmployee() {
    const employeeForm = document.getElementById('employeeForm');
    const newEmployee = {
        id: employeeForm.id.value,
        name: employeeForm.name.value,
        department: employeeForm.department.value,
        email: employeeForm.email.value,
        phone: employeeForm.phone.value,
        address: employeeForm.address.value,
        date: new Date().toLocaleDateString()
    };
    employees.push(newEmployee);
    localStorage.setItem('employees', JSON.stringify(employees));
    hideModal();
    renderEmployeeTable();
}

// Function to edit an existing employee
function editEmployee(index) {
    const employeeForm = document.getElementById('employeeForm');
    const updatedEmployee = {
        id: employeeForm.id.value,
        name: employeeForm.name.value,
        department: employeeForm.department.value,
        email: employeeForm.email.value,
        phone: employeeForm.phone.value,
        address: employeeForm.address.value,
        date: employees[index].date
    };
    employees[index] = updatedEmployee;
    localStorage.setItem('employees', JSON.stringify(employees));
    hideModal();
    renderEmployeeTable();
}

// Function to delete an existing employee
function deleteEmployee(index) {
    employees.splice(index, 1);
    localStorage.setItem('employees', JSON.stringify(employees));
    renderEmployeeTable();
}

// Function to print the employee table
function printEmployeeTable() {
    const printWindow = window.open('', '_blank');
    const tableToPrint = document.getElementById('employeeTable').outerHTML;
    const style = `
        <style>
            /* Add any additional print-specific styles here */
            body { font-family: Arial, sans-serif; }
            table { border-collapse: collapse; width: 100%; }
            th, td { border: 1px solid #dddddd; text-align: left; padding: 8px; }
        </style>
    `;

    printWindow.document.open();
    printWindow.document.write('<html><head>' + style + '</head><body>');
    printWindow.document.write(tableToPrint);
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.print();
    printWindow.close();
}

// Initial rendering of the employee table and count
renderEmployeeTable();
