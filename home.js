const cardContainer = document.getElementById("card-container");
cardContainer.innerHTML = "";
let allIssues = [];
const spinner = (isLoading) => {
	const loader = document.getElementById('loader');
	if (isLoading) {
		loader.classList.remove('hidden')
	}
	else {
		loader.classList.add('hidden')
	}
}

function loadCard() {
	spinner(true);
	fetch('https://phi-lab-server.vercel.app/api/v1/lab/issues').then(res => res.json()).then((data) => {
		allIssues = data.data
		displayCard(data.data)
		spinner(false)
	}

	);

}
loadCard();
const filterIssues = (status) => {
	const ardContainer = document.getElementById("card-container");
	ardContainer.innerHTML = "";
	spinner(true)
	const allBtn = document.getElementById('all-btn');
	const openBtn = document.getElementById('open-btn');
	const closeBtn = document.getElementById('closed-btn');
	const buttons = [allBtn, openBtn, closeBtn]

	buttons.forEach(btn => {
		btn.classList.remove('bg-blue-800', 'text-white')
		btn.classList.add('bg-gray-200', 'text-black')
	});
	const activeBtn = document.getElementById(`${status}-btn`);
	activeBtn.classList.remove('bg-gray-200', 'text-black');
	activeBtn.classList.add('bg-blue-800', 'text-white')
	const cardContainer = document.getElementById("card-container");
	cardContainer.innerHTML = "";




	if (status === 'all') {
		displayCard(allIssues);
	}

	else {
		const filtered = allIssues.filter(item => item.status.toLowerCase() === status.toLowerCase());
		displayCard(filtered)
	}
	spinner(false)
}



const displayCard = (data) => {




	const countElement = document.getElementById("issue-count");
	if (countElement) {
		countElement.innerText = data.length;
	}


	const cardContainer = document.getElementById("card-container");
	cardContainer.innerHTML = "";






	for (element of data) {
		const div = document.createElement('div');
		let shadow = "";

		const priority = element.priority ? element.priority.toLowerCase() : "";


		if (priority === 'high' || priority === 'medium') {
			shadow = "border-t-green-600";
		} else if (priority === 'low') {
			shadow = "border-t-purple-600";
		}
		div.innerHTML = `
			<div onclick="showModalDetails('${element.id}')" class="bg-white gap-6 p-4 border-t-4  ${shadow} rounded-sm shadow-sm h-full">
			<div class="flex justify-between ">
				<img src="./assets/Open-Status.png">
				<p class="text-red-500 bg-red-200  px-8 rounded-xl uppercase py-1">${element.priority}</p>
			</div>
			<h1 class="font-bold text-xl mt-3">${element.title}</h1>
			<h2 class="mt-2 line-clamp-2 text-gray-600">${element.description}</h2>
			<p class="mt-3 flex gap-2">
    <div class="mt-3 flex flex-wrap gap-2">
    ${element.labels.map(label => {

			let colorClass = "bg-orange-100 text-orange-500";
			let icon = "fa-life-ring";

			if (label.toLowerCase() === 'bug') {
				colorClass = "bg-red-200 text-red-500";
				icon = "fa-bug";
			} else if (label.toLowerCase() === 'enhancement') {
				colorClass = "bg-green-200 text-green-600";
				icon = "fa-wand-magic-sparkles";
			}

			return `
            <span class="${colorClass} px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1 uppercase">
                <i class="fa-solid ${icon}"></i>
                ${label}
            </span>
        `;
		}).join('')}
</div>

			<hr class="my-6 border-t border-gray-200  -mx-4">
			<p class="mt-4 text-gray-600">${element.author}</p>


			<p class="mt-2 text-gray-600">
    ${element.createdAt ? new Date(element.createdAt).toLocaleDateString() : 'No Date'}
</p>


		</div>`
		cardContainer.appendChild(div)
	}
}

const showModalDetails = async (id) => {
	const res = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`);
	const result = await res.json();
	const issue = result.data;

	const modal = document.getElementById('my_modal_5');


	modal.innerHTML = `
    <div class="modal-box bg-white max-w-3xl p-8 rounded-xl relative">
        <form method="dialog">


        <h2 class="text-3xl font-bold text-[#1F2937] mb-3">${issue.title}</h2>

        <div class="flex items-center gap-3 mb-6 text-sm">
            <span class="bg-[#DCFCE7] text-[#15803D] px-3 py-1 rounded-md font-semibold capitalize">
                ${issue.status}
            </span>
            <span class="text-gray-500 font-medium">
                Opened by <span class="text-gray-700">${issue.author || 'User'}</span> •
                ${new Date(issue.createdAt).toLocaleDateString('en-GB')}
            </span>
        </div>
<div class="flex gap-2">
        ${issue.labels.map(label => {

		let colorClass = "bg-orange-100 text-orange-500";
		let icon = "fa-life-ring";

		if (label.toLowerCase() === 'bug') {
			colorClass = "bg-red-200 text-red-500";
			icon = "fa-bug";
		} else if (label.toLowerCase() === 'enhancement') {
			colorClass = "bg-green-200 text-green-600";
			icon = "fa-wand-magic-sparkles";
		}

		return `
            <span class="${colorClass} px-3 py-1 rounded-full text-sm w-fit font-bold flex items-center gap-1 uppercase">
                <i class="fa-solid ${icon}"></i>
                ${label}
            </span>
        `;
	}).join('')}
	</div>
        <div class="mb-10 mt-6">
            <p class="text-[#4B5563] text-lg leading-relaxed">
                ${issue.description}
            </p>
<div class="flex justify-between mt-6 bg-gray-100 p-8 rounded-lg">

<div>
<p class="text-gray-400 text-sm font-medium mb-1 uppercase tracking-wider">Assignee:</p>

                <span class="text-gray-800 font-bold">${issue.assignee}</span>

</div>

               <div class="ml-9 mr-70 ">
			   <p class="text-gray-400 mb-1 text-sm font-medium uppercase tracking-wider">Priority:</p>



                <span class="bg-[#EF4444]  text-white px-6 py-1 rounded-full text-xs font-bold uppercase">
                    ${issue.priority}
                </span>
				</div>

				</div>
            </div>
			<div>
			<button class="ml-auto block btn btn-primary">Close</button>
			</div>
        </div>




    `;


	modal.showModal();
};
const handleSearch = () => {
	const searchText = document.getElementById('search-field').value.toLowerCase();


	const searchedIssues = allIssues.filter(issue =>
		issue.title.toLowerCase().includes(searchText)
	);


	displayCard(searchedIssues);
};