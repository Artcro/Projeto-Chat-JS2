window.addEventListener("load", (e) =>
{
	addUsersToDb();
	LocalStorageManager.loadUsers();
	createProfileCards();
})

window.addEventListener("storage", (e) =>
{
})

function addUsersToDb()
{
	const users = loadFromLocalStorage(lsUsers);
	if (!users)
	{
		const userData = [
			{
				id: 1,
				name: "Alice Smith",
				profilePictureUrl: "https://randomuser.me/api/portraits/women/1.jpg"
			},
			{
				id: 2,
				name: "Bob Johnson",
				profilePictureUrl: "https://randomuser.me/api/portraits/men/2.jpg"
			},
			{
				id: 3,
				name: "Catherine Lee",
				profilePictureUrl: "https://randomuser.me/api/portraits/women/3.jpg"
			},
			{
				id: 4,
				name: "Daniel Brown",
				profilePictureUrl: "https://randomuser.me/api/portraits/men/4.jpg"
			},
			{
				id: 5,
				name: "Eva Green",
				profilePictureUrl: "https://randomuser.me/api/portraits/women/5.jpg"
			},
			{
				id: 6,
				name: "Frank Harris",
				profilePictureUrl: "https://randomuser.me/api/portraits/men/6.jpg"
			},
			{
				id: 7,
				name: "Grace Kelly",
				profilePictureUrl: "https://randomuser.me/api/portraits/women/7.jpg"
			},
			{
				id: 8,
				name: "Henry Morgan",
				profilePictureUrl: ""
			},
			{
				id: 9,
				name: "Isla Parker",
				profilePictureUrl: ""
			},
			{
				id: 10,
				name: "Jack Quinn",
				profilePictureUrl: ""
			}
		];

		const userInstances = userData.map(user => new User(user));
		saveToLocalStorage(lsUsers, userInstances)
	}
}

