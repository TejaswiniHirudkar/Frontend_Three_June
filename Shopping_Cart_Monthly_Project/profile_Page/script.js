let users = JSON.parse(sessionStorage.getItem("loggedUser"))
let prof = document.getElementById('profile')
prof.textContent = users.fstName
let fname = document.getElementById('profilefname');
let lname = document.getElementById('profilelname');
let savebtn = document.getElementById('saveinfo');
let note = document.getElementById('note');

let curruser = JSON.parse(sessionStorage.getItem('loggedUser'));
fname.value = curruser.fstName; // Corrected property name
lname.value = curruser.lstName; // Corrected property name

// changing and updating name-----------------------------------------------------------

savebtn.addEventListener('click', (event) => {
  event.preventDefault()

  // set session storage --------------------------------------------
  curruser.fstName = fname.value.trim()
  curruser.lstName = lname.value.trim()
  sessionStorage.setItem('loggedUser', JSON.stringify(curruser))

  // set local storage  ------------------------------------------------------

  let localstrg = JSON.parse(localStorage.getItem('users'));
  let userIndex = localstrg.findIndex((obj) => obj.uEmail === curruser.uEmail);
  localstrg[userIndex].fstName = fname.value.trim();
  localstrg[userIndex].lstName = lname.value.trim();
  localStorage.setItem('users', JSON.stringify(localstrg));

  note.innerText = `name ${fname.value}${lname.value}updated successfully`
  note.style.color = 'green'

  //curruser = {}
  updateName()
})

//  changing password -------------------------------------------

let oldpass = document.getElementById('oldpass');
let newpass = document.getElementById('newpass');
let rePass = document.getElementById('cnfpass');
let changepass = document.getElementById('changepass');
let notes = document.getElementById('notes');

changepass.addEventListener('click', (event) => {
  event.preventDefault();

  let curruser = JSON.parse(sessionStorage.getItem('loggedUser'));
  let localstrg = JSON.parse(localStorage.getItem('users'));

  if (oldpass.value === curruser.uPassword) {
    if (newpass.value === rePass.value) {

      // set session storage --------------------------------------------

      curruser.uPassword = newpass.value;
      curruser.rePassword = newpass.value
      sessionStorage.setItem('loggedUser', JSON.stringify(curruser));

      // set localStorage  ---------------------------------------------

      let userIndex = localstrg.findIndex((obj) => obj.uEmail === curruser.uEmail);
      localstrg[userIndex].uPassword = newpass.value;
      localstrg[userIndex].rePassword = newpass.value;
      localStorage.setItem('users', JSON.stringify(localstrg));

      notes.innerText = 'Password changed successfully';
      notes.style.color = 'green';
    } else {
      notes.innerText = 'New password does not match with re-entered password';
      notes.style.color = 'red';
    }
  } else {
    notes.innerText = 'Old password is incorrect. Please enter the correct password';
    notes.style.color = 'red';
  }

  oldpass.value = '';
  newpass.value = '';
  rePass.value = '';
});

// logout and clear session storage  ----------------------------------------------------

let logout = document.getElementById("logoutbtn")
logout.addEventListener('click', () => {
  //sessionStorage.clear();
  window.location.href = 'http://127.0.0.1:5500/Shopping_Cart_Monthly_Project/index.html'
})