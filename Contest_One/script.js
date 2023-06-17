let employees=[];
if(employees.length===0){
    document.getElementById("initialmsg").innerHTML=`<p>You have 0 employees.</p>`
}


//function to add employees
function addEmployee(event){
    event.preventDefault(); // Prevent form submission

    // Get input values
  const name = document.getElementById('name').value;
  const profession = document.getElementById('profession').value;
  const age = document.getElementById('age').value;

  // Check if required fields are empty
  if (name === '' || profession === '' || age === '') {
    showError('Error: Plese Make sure All the fields are filled before adding in an employee!');
    return;
  }

  // Create a new employee object
  const employee = {
    id: generateId(),
    name,
    profession,
    age: parseInt(age)
  };

  // Add employee to the array
  employees.push(employee);

  //Clear input fields
  document.getElementById('name').value = '';
  document.getElementById('profession').value = '';
  document.getElementById('age').value = '';

  // Display success message
  showSuccess('Success: employee Added!');

  // Refresh employee list
  inimsg();
  displayEmployees();
}

//Function to generate a unique ID for each employee
function generateId() {
  if (employees.length === 0) {
    return 1;
  } else {
    const ids = employees.map(employee => employee.id);
    return Math.max(...ids) + 1;
  }
}

// Function to display added employees
function displayEmployees(){
    const employeeList = document.getElementById('employee-list');
  employeeList.innerHTML = '';

  employees.forEach(employee => {
    const employeeCard = document.createElement('div');
    employeeCard.classList.add('employee-card');

    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = 'Delete User';
    deleteButton.addEventListener('click', () => deleteEmployee(employee.id));
    const btndiv=document.createElement('div');
    btndiv.appendChild(deleteButton);


    employeeCard.innerHTML = `<p>${employee.id}.&nbsp &nbsp &nbsp</p>
      <p><strong>Name:</strong> ${employee.name}&nbsp &nbsp &nbsp</p>
      <p><strong>Profession:</strong> ${employee.profession}&nbsp &nbsp &nbsp</p>
      <p><strong>Age:</strong> ${employee.age}</p>
    `;
    employeeList.appendChild(employeeCard);
    employeeList.appendChild(btndiv);
  });
  
}

// Function to delete an employee
function deleteEmployee(id) {
    employees = employees.filter(employee => employee.id !== id);
    displayEmployees();
}

// Function to show an error message
function showError(message) {
    const errorMessage = document.getElementById('error');
    errorMessage.innerHTML = message;
    errorMessage.classList.add('error');
    setTimeout(() => {
      errorMessage.innerHTML = '';
      errorMessage.classList.remove('error');
    }, 5000);
}

//function to display 0 employee msg
function inimsg(){
    if(employees.length===0){
        document.getElementById("initialmsg").innerHTML="You have 0 employees.";
    }
    document.getElementById("initialmsg").innerHTML="";
}

// Function to show a success message
function showSuccess(message) {
    const successMessage = document.getElementById('success');
    successMessage.innerHTML = message;
    successMessage.classList.add('success');
    setTimeout(() => {
      successMessage.innerHTML = '';
      successMessage.classList.remove('success');
    }, 3000);
}

// Event listener for form submission
document.getElementById('btn').addEventListener('click', addEmployee);
