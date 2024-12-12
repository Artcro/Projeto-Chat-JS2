let lsUsers = "users";
let lsMessages = "messages";

class LocalStorageManager
{
	static #users = [];

	static get users()
	{
		if (this.#users.length < 1)
		{
			this.loadUsers();
		}
		return this.#users;
	}

	static set users(value)
	{
		this.#users = value;
		saveToLocalStorage(lsUsers, this.#users);
	}
	
	static loadUsers()
	{
		let loaded = loadFromLocalStorage(lsUsers);
		if (loaded)
		{
			this.users = loaded.map(data => new User(data));
		}
	}
	
	static getUserFromId(id)
	{
		return this.users.find(user => user.id == id);
	}
	
	static getMessages()
	{
		let loaded = loadFromLocalStorage(lsMessages);
		
		if (!loaded)
		{
			saveToLocalStorage(lsMessages, []);
		}
		loaded = loadFromLocalStorage(lsMessages);
			let messages = [];
			
			loaded.forEach(message =>
			{
				messages.push(new Message(message))
			})
			
			return messages.sort((a, b) => a.createdAt - b.createdAt);
	}
	
	static addMessage(messageObj)
	{
		let toSend = LocalStorageManager.getMessages();
		toSend.push(messageObj);
		saveToLocalStorage(lsMessages, toSend);
	}
}

class User
{
	id;
	name = "";
	profilePictureUrl;
	nameInitial;

	constructor({id, name, profilePictureUrl = ""})
	{
		this.id = id;
		this.name = name;
		this.profilePictureUrl = profilePictureUrl;
		this.nameInitial = name.split("")[0];
	}


	generateProfilePicture()
	{
		const divProfilePicture = document.createElement("div");
		divProfilePicture.classList.add("rounded-circle");
		divProfilePicture.classList.add("bg-primary");
		divProfilePicture.classList.add("profile-picture");
		divProfilePicture.id = "profile-picture-" + this.id;

		if (!this.profilePictureUrl)
		{
			divProfilePicture.innerText = this.nameInitial;
		}
		else
		{
			divProfilePicture.style.background = "url(" + this.profilePictureUrl + ") no-repeat center center";
			divProfilePicture.style.backgroundSize = "cover";
		}

		return divProfilePicture;
	}

	generateUrl()
	{
		return "./chat.html?id=" + this.id;
	}
}

class Message
{
	content;
	authorId;
	createdAt;

	constructor({content, authorId, createdAt})
	{
		this.content = content;
		this.authorId = authorId;
		this.createdAt = createdAt || new Date();
	}
}

function createProfileCards()
{
	const cardContainer = document.getElementById("card-container");

	LocalStorageManager.users.forEach(user =>
	{
		LocalStorageManager.getUserFromId(user.id);
		const card = document.createElement("div");
		card.classList.add("col");

		card.innerHTML = `
			<div class="col">
                <div class="card" style="border-radius: 15px;">
                    <div class="card-body text-center">
                        <div class="mt-2 mb-2 d-flex justify-content-center align-items-center" id="image-container-${user.id}">
                        </div>
                        <h4 class="mb-2">${user.name}</h4>
                        <button 
                        	type="button"
                       		data-mdb-button-init data-mdb-ripple-init 
                       		class="btn btn-primary btn-rounded btn-lg mt-3"
                       		id="btn-profile-${user.id}"
                       		>
                            Use Profile
                        </button>
                    </div>
                </div>
            </div>
		`
		cardContainer.appendChild(card);

		const pictureContainer = document.getElementById(`image-container-${user.id}`);
		pictureContainer.appendChild(user.generateProfilePicture());

		const btnProfile = document.getElementById(`btn-profile-${user.id}`);
		btnProfile.addEventListener("click", (e) =>
		{
			window.location = user.generateUrl();
		});
	})
}

function loadFromLocalStorage(name)
{
	return JSON.parse(localStorage.getItem(name));
}

function saveToLocalStorage(name, content)
{
	localStorage.setItem(name, JSON.stringify(content));
}