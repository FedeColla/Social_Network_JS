import contentCard from "./cardData.js";

const postsContainer = document.querySelector("#postsContainer"); //contenedor
// const {illustration, name, author} = contentCard;

const postCard = contentCard.map (({illustration, name, author}) => //desestructuro en la función map
    `
    <div class="card">
        <img src="${illustration}">
        <div class="heading">
            <div class="texts">
                <h3>${name}</h3>
                <h4><strong>by</strong> ${author}</h4>
            </div>
            <i class="fa-solid fa-heart like" id="like"></i>
        </div>
        <form class="form">
            <input type="text" value="Leave a comment!" class="commentField">
            <input class="submitButton" type="submit" value="▶" >
        </form>
        <ol class="comments" class="comments"></ol>    
    </div>
    `
).join(''); //con .join elimino las comillas simples que me quedaban entremedio de cada card

postsContainer.innerHTML = postCard; //Agrego todo a la section


const likeButtons = document.querySelectorAll(".like"); //botón de like
const submitButtons = document.querySelectorAll(".submitButton"); //submit
const forms = document.querySelectorAll(".form"); //form
const commentFields = document.querySelectorAll(".commentField"); //input
const commentsLists = document.querySelectorAll(".comments"); //ol
const notificationsField = document.querySelector(".notifications");

const notificationList = document.getElementById("notificationList");


likeButtons.forEach(likeButton => {
    likeButton.addEventListener('click', () => {
        likeButton.classList.toggle("red");
    });
});

function notifications() {
    notificationList.innerHTML = ''; // Limpiar la lista
    for (let i = 0; i < localStorage.length; i++) {
        const commentData = JSON.parse(localStorage.getItem(`Comentario ${i}`));
        if (commentData) {
            let li = document.createElement("li");
            let text = document.createElement("p");
            let timer = document.createElement("span");
            notificationsField.style.display="flex";
            text.innerText = `${commentData.comment}`;
            timer.innerText= `${commentData.time}`;
            li.appendChild(text);
            li.appendChild(timer);
            // li.innerText = `${commentData.comment} - ${commentData.time}`;
            notificationList.appendChild(li); // Agregar a la lista de últimos comentarios
        }
    }
}

commentFields.forEach((commentField, index) => {
    const submitButton = submitButtons[index]; // Referencia al botón de submit
    const commentsList = commentsLists[index]; // Referencia a la lista de comentarios correspondiente
    const form = forms[index]; // Referencia al formulario correspondiente

    commentField.addEventListener('focus', () => {
        if (commentField.value === "Leave a comment!") {
            commentField.value = '';
            submitButton.style.cursor = "pointer";
        }
        if (submitButton) {
            submitButton.classList.add('hover');
        }
    });

    commentField.addEventListener('blur', () => {
        if (commentField.value === '') {
            commentField.value = "Leave a comment!";
            submitButton.style.cursor = "auto";
        }
        if (submitButton) {
            submitButton.classList.remove('hover');
        }
    });

    // Manejo del submit del formulario
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        let li = document.createElement("li"); //general
        let text = document.createElement("p"); //comentario
        let timer = document.createElement("span"); //hora

        //regisrto de hora
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const timeString = `${hours}:${minutes} hs.`;
        timer.innerText = timeString;

        //inserto en HTML y modificaciones de estilo
        text.innerText = commentField.value;

        const commentIndex = localStorage.length; // Usar longitud de localStorage

        // Crear un objeto con comentario y hora
        const commentData = {
            comment: commentField.value,
            time: timeString
        };
    
        // Guardar en localStorage
        localStorage.setItem(`Comentario ${commentIndex}`, JSON.stringify(commentData));

        commentsList.style.display="flex";
        form.style.paddingBottom = "0";
        commentField.value = ''; // Limpiar el campo
        li.appendChild(text);
        li.appendChild(timer);
        commentsList.appendChild(li); // Agregar el comentario a la lista correspondiente

        notifications();
    });
});




notifications();