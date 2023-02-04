
if(document.readyState !== "loading"){
    initializeCodeLogin();
} else{
    document.addEventListener("DOMContentLoaded",function(){
        initializeCodeLogin();
    });
};

function initializeCodeLogin(){
    document.getElementById("login-form").addEventListener("submit", onSubmit);
}

async function onSubmit(event){
    const credentialsObject = new Object;
    credentialsObject.email = document.getElementById("email").value
    credentialsObject.password = document.getElementById("password").value
    event.preventDefault();
    fetch("http://localhost:3000/api/user/login", {
        method: "POST",
        headers:{
            'Content-Type': 'application/json' 
        },
        body: JSON.stringify(credentialsObject)
    })
    .then((response) => response.json())
    .then((data) => {
        if(data.token){
            localStorage.setItem("auth_token",data.token);
            window.location.href="/";
        }
        else{
            document.getElementById("error").innerText = data.Errors[0].msg
            console.log(data.Errors[0].msg);
        }
    })
}
