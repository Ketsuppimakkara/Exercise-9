

if(document.readyState !== "loading"){
    initializeCodeLogin();
} else{
    document.addEventListener("DOMContentLoaded",function(){
        initializeCodeLogin();
    });
};

function initializeCodeLogin(){

    let container = document.getElementById("container");
    const loginLink = document.createElement("a");
    loginLink.innerText = "login";
    loginLink.href="/login.html"
    const registerLink = document.createElement("a");
    registerLink.innerText = "register";
    registerLink.href="/register.html"


    let todoList = document.createElement('ul');
    todoList.id = "todoList";

    const jwtObject = new Object;
    if(localStorage.getItem("auth_token") != null){
        const token = localStorage.getItem("auth_token");
        jwtObject.token = token;
    }
    else{
        container.appendChild(loginLink);
        container.appendChild(registerLink);
    }
    fetch("/", {
        method: "POST",
        headers:{
            'Content-Type': 'application/json' 
        },
        body: JSON.stringify(jwtObject)
    })
    .then((response) => response.json())
    .then((data) => {

        if(data.email){
            const logoutButton = document.createElement("BUTTON");
            logoutButton.innerText = "Logout";
            logoutButton.id = "logout";
            logoutButton.addEventListener("click", deleteLocalStorage);
            container.appendChild(logoutButton);
            container.appendChild(document.createTextNode(data.email));

            const todoTextArea = document.createElement("textArea");
            todoTextArea.id = "add-item";
            document.addEventListener('keydown', (event) => {
                if(event.key == "Enter"){
                                    
                    const todoObject = new Object
                    todoObject.items = []
                    todoObject.items.push(todoTextArea.value)
                    console.log(todoObject);

                    fetch("/api/todos", {
                        method: "POST",
                        headers:{
                            'Content-Type': 'application/json',
                            'authorization': 'Bearer '+localStorage.getItem("auth_token")
                        },
                        body: JSON.stringify(todoObject)
                    })
                    .then((response) => response.json())
                    .then((data) => {
                        todoList.innerHTML = "";
                        if(!data.items){
                            return
                        }
                        if(data.items.length > 0){
                            for(var i = 0; i<data.items.length; i = i+1){
                                console.log("Added item "+data.items[i]);
                                const listItem = document.createElement("li")
                                listItem.innerText = data.items[i]
                                todoList.appendChild(listItem);
                                
                            }

                            container.appendChild(todoList);

                        }
                    })
                }
              }, false);
            container.appendChild(todoTextArea);


            fetch("/api/todos", {
                method: "POST",
                headers:{
                    'Content-Type': 'application/json',
                    'authorization': 'Bearer '+localStorage.getItem("auth_token")
                },
                body: '[{}]'
            })
            .then((response) => response.json())
            .then((data) => {
                if(data.items.length > 0){
                    for(var i = 0; i<data.items.length; i = i+1){
                        console.log("Added item "+data.items[i]);
                        const listItem = document.createElement("li")
                        listItem.innerText = data.items[i]
                        todoList.appendChild(listItem);
                        
                    }
                    container.appendChild(todoList);

                }
                else{
                    return
                }
            })
            
        }
        else{
            container.appendChild(loginLink);
            container.appendChild(registerLink);
        }
    })
}

function deleteLocalStorage(){
    localStorage.clear();
    window.location.href="/";
    return;
}

function sendTodos(){

    return
}