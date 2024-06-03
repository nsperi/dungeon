const chatSocket = io("/chat");

let chatInput = document.querySelector("#chatInput");
let chatForm = document.querySelector("#chatForm");
let chatMessages = document.querySelector("#messages");
let chatNickname = document.querySelector("#nickname");

let nickname = "";
let userConnectionTimestamp = 0;
let messagesArray = [];

chatForm.addEventListener("submit", (e) => {
  e.preventDefault();
});

chatInput.addEventListener("keyup", (e) => {
  if (e.key == "Enter") {
    const message = e.target.value;
    const date = new Date().toLocaleString();
    const messageTimestamp = Date.now();

    let messageData = {
      user: nickname,
      messageDate: date,
      messageTimestamp,
      messageContent: message,
    };

    chatSocket.emit("client message", messageData);
    e.target.value = "";
  }
});

Swal.fire({
  title: "Type your nickname",
  input: "text",
  allowOutsideClick: false,
  allowEscapeKey: false,
  inputValidator: (value) => !value && "Please write your nickname.",
  showCancelButton: false,
  confirmButtonText: "Sign up",
}).then((result) => {
  nickname = result.value;
  const date = new Date().toLocaleString();
  userConnectionTimestamp = Date.now();

  let messageData = {
    user: nickname,
    messageDate: date,
    messageTimestamp: userConnectionTimestamp,
    messageContent: `User ${nickname} is online.`,
  };

  Swal.fire(`Welcome ${nickname}!`);
  chatNickname.innerHTML = nickname;

  chatSocket.emit("client message", messageData);
});

chatSocket.on("server messages", async (serverMessages) => {
  messagesArray = serverMessages;

  let template = ``;

  //Validamos si el cliente esta conectado antes de mapear el array de mensajes en el template
  if (userConnectionTimestamp !== 0) {
    //Con filter evitamos de que se rendericen mensajes anteriores a la hora de conexión del cliente
    template = messagesArray
      .filter((message) => message.messageTimestamp >= userConnectionTimestamp)
      .map((each) => {
        let divClass = each.user === nickname ? "flex-row" : "flex-row-reverse";
        let spanClass =
          each.user === nickname ? "bg-primary-subtle" : "bg-info-subtle";

        return `
                <div class="d-flex ${divClass} justify-content-center m-2">
                    <div class="d-flex justify-content-center p-2 align-items-center" >
                        <img class="h-full w-full" src="/images/user_icon_dark.svg" alt="User avatar">
                    </div>
                    <span id='messages' name='messages' class='form-control ${spanClass} p-2'>
                        <div class="d-flex flex-column justify-content-between">
                            <p>
                                <b>${each.user}:</b> ${each.messageContent}
                            </p>
                            <p class="d-flex justify-content-end align-items-end pb-0">
                                <i> ${each.messageDate} </i>
                            </p>
                        </div>
                    </span>
                </div >
                `;
      })
      .join("");
  } else {
    template.join("");
  }

  chatMessages.innerHTML = template;
});
