
if(document.readyState !== "loading"){
    initializeCodeRegister();
} else{
    document.addEventListener("DOMContentLoaded",function(){
        initializeCodeRegister();
    });
};

function initializeCodeRegister(){
    document.getElementById("register-form").addEventListener("submit", onSubmit);
}

async function onSubmit(event){
    event.preventDefault();
    const credentialsObject = new Object;
    credentialsObject.email = document.getElementById("email").value
    credentialsObject.password = document.getElementById("password").value

    fetch("http://localhost:3000/api/user/register", {
        method: "POST",
        headers:{
            'Content-Type': 'application/json' 
        },
        body: JSON.stringify(credentialsObject)
    })
    .then((response) => response.json())
    .then((data) => {
        if(!data.Errors){
            window.location.href="/login.html";
        }
        else{
            document.getElementById("error").innerText = data.Errors[0].msg
            console.log(data.Errors[0].msg);
        }
    })
}
