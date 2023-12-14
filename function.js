username = ['gener']
password = ['pahamtang']

function login(){
    let a = document.getElementById("username");
    let b = document.getElementById("password");
    let c = document.getElementById("error");
    if(a.value == username[0] && b.value == password[0]){
        window.location.href = "dashboard.html";
    }else{
        c.style.color = "red";
        c.innerHTML = "Wrong Username or Password!!";
    }
    if(b.value == ""){
        c.style.color = "red";
        c.innerHTML = "Password is required";
    };
    if(a.value == ""){
        c.style.color = "red";
        c.innerHTML = "Username is required";
    };
    
};
function show(){
    let a = document.getElementById("dbuser");
    let b = document.getElementById("dbpass");
    a.innerHTML = username[0];
    b.innerHTML = password[0];
};

function profile(){
    window.location.href = "gener.html";
}

