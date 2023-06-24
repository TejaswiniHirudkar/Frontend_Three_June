function handleEvents() {
    var signupButton = document.getElementById('signup-btn');
    var logoutButton = document.getElementById('logout-btn');
  
    // Signup button click event
    signupButton.addEventListener('click', function(event) {
      event.preventDefault();
      signup();
    });
  
    logoutButton.addEventListener('click', function(event) {
      event.preventDefault();
      logout();
    });
  
    // Check access token and redirect
    var accessToken = localStorage.getItem('accessToken');
    var currentPath = window.location.pathname;
    var isSignupPage = currentPath.includes('index.html');
    var isProfilePage = currentPath.includes('profile.html');
  
    if (accessToken && isSignupPage) {
      redirectToProfile();
    } else if (!accessToken && isProfilePage) {
      redirectToSignup();
    }
  
    // Display user details on the profile page
    if (isProfilePage) {
      displayUserDetails();
    }
  }
  
  function signup() {
    // Get input values and perform validation
    let namevalue=document.getElementById('name').value;
    let emailvalue=document.getElementById('email').value;
    let passwordvalue=document.getElementById('password').value;
    let confirmpasswordvalue=document.getElementById('confirm-password').value;
  
    if(namevalue===''|| emailvalue===''|| passwordvalue===''|| confirmpasswordvalue===''){
        showerr();
        return;
    }
    else{
        showsucc();
    }
    // Generate access token
    var accessToken = generateAccessToken();
  
    // Create user state object
    var userState = {
      "name":namevalue,
      "email": emailvalue,
      "password": passwordvalue,
      "confirmpassword":confirmpasswordvalue,
      "accessToken":accessToken
    };
    var jsonString=JSON.stringify(userState);
  
    // Store user state and access token in local storage
    localStorage.setItem('userState', jsonString);
    localStorage.setItem('accessToken', accessToken);
  
    // Redirect to profile page
    if(accessToken){
      redirectToProfile();
      displayUserDetails();
    }
    else{
      redirectToSignup();
    }
      
  }

  function displayUserDetails() {
    // Retrieve user details from local storage
    var userState = JSON.parse(jsonString);
    var nameElement=document.getElementById('pname');
    var emailElement=document.getElementById('pemail');
    var passwordElement=document.getElementById('ppassword');
    
    //Display the details
    console.log(userState);
    if(userState.accessToken){
      nameElement.innerText=userState.name;
    emailElement.innerText=userState.email;
    passwordElement.innerText=userState.password;
    }
    else{
      redirectToSignup();
    }
    
}

  function logout() {
    // Clear user state and access token from local storage
    localStorage.removeItem('userState');
    localStorage.removeItem('accessToken');
  
    // Redirect to signup page
    redirectToSignup();
  }

  function showerr(){
    let error=document.getElementById('error');
    error.textContent="Error";
    setTimeout(() => {
        error.remove();
    }, 2000);
  }

  function showsucc(){
    let success=document.getElementById('success');
    success.textContent="Success";
    setTimeout(() => {
        success.remove();
    }, 2000);
  }
  
  function generateAccessToken(){
    var char="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var token='';
    for(var i=0; i<16; i++){
        var randomIndex=Math.floor(Math.random()*char.length);
        token +=char.charAt(randomIndex);
    }
    return token;
}
  
function redirectToProfile() {
  window.location.href = 'http://127.0.0.1:5500/Contest_Two/profile.html';
}

function redirectToSignup() {
  window.location.href = 'http://127.0.0.1:5500/Contest_Two/index.html';
}


handleEvents();
  