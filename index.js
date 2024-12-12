window.addEventListener("load", (e) =>
{
	addUsersToDb();
	addMessagesToDb();
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

function addMessagesToDb()
{
	const messages = loadFromLocalStorage(lsMessages);
	if (!messages)
	{
		const messagesData = [
			{ content: "Hey everyone! How's it going?", authorId: 1, createdAt: new Date("2024-12-11T10:00:00") },
			{ content: "I'm good, thanks! How about you?", authorId: 2, createdAt: new Date("2024-12-11T10:02:00") },
			{ content: "Pretty busy here, but doing fine!", authorId: 3, createdAt: new Date("2024-12-11T10:03:30") },
			{ content: "Any updates on the project?", authorId: 4, createdAt: new Date("2024-12-11T10:04:00") },
			{ content: "Yes, we're almost done with the draft.", authorId: 5, createdAt: new Date("2024-12-11T10:05:15") },
			{ content: "Great to hear! When can we review it?", authorId: 6, createdAt: new Date("2024-12-11T10:06:45") },
			{ content: "Tomorrow at 3 PM would work for me.", authorId: 7, createdAt: new Date("2024-12-11T10:08:00") },
			{ content: "Same here. Let’s confirm the time.", authorId: 8, createdAt: new Date("2024-12-11T10:09:30") },
			{ content: "Sounds good. I'll send out a calendar invite.", authorId: 9, createdAt: new Date("2024-12-11T10:10:00") },
			{ content: "Thanks, see you all tomorrow!", authorId: 10, createdAt: new Date("2024-12-11T10:12:00") },
			{ content: "Did anyone check the latest report?", authorId: 3, createdAt: new Date("2024-12-11T10:13:00") },
			{ content: "Yes, it looks good to me.", authorId: 7, createdAt: new Date("2024-12-11T10:14:00") },
			{ content: "Can someone confirm the meeting link?", authorId: 2, createdAt: new Date("2024-12-11T10:15:30") },
			{ content: "I'll do it right now.", authorId: 5, createdAt: new Date("2024-12-11T10:16:00") },
			{ content: "The link is in the email.", authorId: 1, createdAt: new Date("2024-12-11T10:17:00") },
			{ content: "Thanks! I'll join on time.", authorId: 4, createdAt: new Date("2024-12-11T10:18:30") },
			{ content: "Do we need to prepare anything?", authorId: 8, createdAt: new Date("2024-12-11T10:19:00") },
			{ content: "Just review the draft beforehand.", authorId: 6, createdAt: new Date("2024-12-11T10:20:15") },
			{ content: "Got it. See you then!", authorId: 10, createdAt: new Date("2024-12-11T10:21:30") },
			{ content: "Has everyone confirmed their tasks?", authorId: 9, createdAt: new Date("2024-12-11T10:22:00") },
			{ content: "Yes, all set on my end.", authorId: 3, createdAt: new Date("2024-12-11T10:23:00") },
			{ content: "Same here. Ready to go.", authorId: 2, createdAt: new Date("2024-12-11T10:24:00") },
			{ content: "Looking forward to it!", authorId: 1, createdAt: new Date("2024-12-11T10:25:00") },
			{ content: "Should we record the meeting?", authorId: 4, createdAt: new Date("2024-12-11T10:26:30") },
			{ content: "Good idea. I'll set it up.", authorId: 8, createdAt: new Date("2024-12-11T10:27:00") },
			{ content: "Thanks for the suggestion.", authorId: 6, createdAt: new Date("2024-12-11T10:28:00") },
			{ content: "See you all tomorrow!", authorId: 10, createdAt: new Date("2024-12-11T10:29:00") },
			{ content: "Bye everyone!", authorId: 7, createdAt: new Date("2024-12-11T10:30:00") },
			{ content: "Take care, everyone.", authorId: 5, createdAt: new Date("2024-12-11T10:31:00") }
		];
		const messages = messagesData.map(data => new Message(data));
		saveToLocalStorage(lsMessages, messages)
	}
}

