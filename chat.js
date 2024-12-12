let currentPageUser;
let currentChat = [];

window.addEventListener("storage", (e) => {
	if (e.key == lsMessages) {
		renderChat();
	}
})

window.addEventListener("load", (e) =>
{
	currentPageUser = chatUserFromId();
	if(!currentPageUser) {
		window.location.href = "index.html"
		return;
	}

	renderChatPage();

	const MessageInput = document.getElementById("input-message");
	const btnSend = document.getElementById("btn-send");

	btnSend.addEventListener("click", (e) =>
	{
		sendMessage(MessageInput.value, (new Date()).getTime());
		MessageInput.value = "";
	})
	
	MessageInput.addEventListener("keydown", (e) => 
	{
		if(e.key === 'Enter') {
			sendMessage(MessageInput.value, (new Date()).getTime());
			MessageInput.value = "";
		}
	})
});

function sendMessage(message, timestamp)
{
	let cleanMessage = message.trim();
	if (!cleanMessage) return;

	const msgObj = new Message(
		{content: cleanMessage, authorId: currentPageUser.id, createdAt: timestamp});
	LocalStorageManager.addMessage(msgObj);
	
	
	renderChat();
}

function chatUserFromId()
{
	const page = window.location.search.split("=").slice(-1)[0];
	return LocalStorageManager.getUserFromId(page);
}

function renderChatPage()
{
	const currentUser = chatUserFromId();
	
	renderHeader(currentUser);
	renderUsers(currentUser);
	renderChat();
}

function logout()
{
	window.location.href = "index.html";
}

function renderHeader(user)
{
	const headerUser = document.getElementById("logged-user-header");
	headerUser.classList.add("bg-primary-subtle");
	headerUser.innerHTML = `
		<div 
		class="mt-0 mb-0 d-flex justify-content-center align-items-center" 
		id="image-container-${user.id}">
        </div>
		<h4 class="m-0">${user.name}</h4>
        <button class="btn btn-primary" onclick="logout()">Log-Out</button>
	`

	const pictureContainer = document.getElementById(`image-container-${user.id}`);
	const img = user.generateProfilePicture();
	img.classList.replace("profile-picture", "profile-picture-chat");
	pictureContainer.appendChild(img);
}

function renderUsers(currentUser)
{
	const userList = document.getElementById("user-list");
	const users = LocalStorageManager.users.filter(user => user.id != currentUser.id);
	
	users.forEach((user) => {
		const li = document.createElement("li");
		li.classList.add("list-group-item");
		li.classList.add("d-flex");
		li.classList.add("align-items-center");
		
		li.innerHTML = `
			<div 
			class="me-3 d-flex justify-content-center align-items-center" 
			id="image-container-${user.id}">
        	</div>
            <div>
            	<strong>${user.name}</strong><br>
               	<small>Online!</small>
            </div>
		`
		userList.appendChild(li);
		const pictureContainer = document.getElementById(`image-container-${user.id}`);
		const img = user.generateProfilePicture();
		img.classList.replace("profile-picture", "profile-picture-chat-sm");
		pictureContainer.appendChild(img);
		
	})
}

function renderChat()
{
	let messagesToAdd = getMessagesDiff();
	
	if (messagesToAdd.length > 0)
	{
		const chatDiv = document.getElementById("chat-div");
		let currentDay = new Date(messagesToAdd[0].createdAt);
		let currentUser;
		
		messagesToAdd.forEach(message => {
			let date = new Date(message.createdAt);
			let time = date.getHours() + ":" + date.getMinutes().toLocaleString('en-US', {
				minimumIntegerDigits: 2,
				useGrouping: false
			});
			const user = LocalStorageManager.getUserFromId(message.authorId);
			 
			
			if(isTomorrow(currentDay, date))
			{
				chatDiv.insertAdjacentHTML("beforeend", `
					 <div class="small text-center text-muted mb-3 border-bottom">
                        ${(date.getDate()) + '/' + (date.getMonth() + 1) + '/' +  date.getFullYear()}
                    </div>
				`)
			}
			currentDay = date;
			
			if (message.authorId == currentPageUser.id)
			{
				chatDiv.insertAdjacentHTML("beforeend", `
					 <div class="text-end mb-3">
                        <div class="d-inline-block bg-primary text-white rounded p-2 shadow-sm">
                            ${message.content}
                        </div>
                        <div class="small text-muted mt-1">${time}</div>
                    </div>
				`)
			}
			else
			{
					chatDiv.insertAdjacentHTML("beforeend", `
					 <div class="text-start mb-3 d-flex flex-row">
					 	<div class="me-1" id="image-chat-${user.id}-${message.createdAt}"></div>
					 	<div>
                        <div class="d-inline-block bg-white rounded pt-1 p-2 shadow-sm">
                        	<div class="small text-primary fw-bold">
                        	${user.name}
                        	</div>
                        	<div>
                            ${message.content}
                            </div>
                        </div>
                        <div class="small text-muted mt-1">${time}</div>
                        </div>
                    </div>
				`)
					const pictureContainer = document.getElementById(`image-chat-${user.id}-${message.createdAt}`);
					const img = user.generateProfilePicture();
					img.classList.replace("profile-picture", "profile-picture-chat-sm");
					
					// if (currentUser == user)
					// {
					// 	img.style.background = ``;
					// 	img.classList.remove("bg-primary");
					// }
					
					pictureContainer.appendChild(img);
				
			}
			currentUser = user;
		})

		chatDiv.scrollTop = chatDiv.scrollHeight;
	}
	
}

function getMessagesDiff() 
{
	const existingIds = new Set(currentChat.map(msg => msg.createdAt));
	const diffIds = LocalStorageManager.getMessages().filter(msg => !existingIds.has(msg.createdAt));
	if (diffIds.length > 0)
	{
		currentChat = LocalStorageManager.getMessages();
	}
	
	return diffIds;
}

function isTomorrow(date1, date2)
{
	let date1Tomorrow = date1.setDate(date1.getDate() + 1);
	return date2 >= date1Tomorrow;
}
