const cardContainer = document.getElementById("card-container");
cardContainer.innerHTML = "";
function loadCard() {
	fetch('https://phi-lab-server.vercel.app/api/v1/lab/issues').then(res => res.json()).then((data) => displayCard(data.data));

}
loadCard();

const displayCard = (data) => {
	for (element of data) {
		const div = document.createElement('div');
		div.innerHTML = `
		<div class="bg-white p-4  shadow-md rounded-sm h-full">
			<div class="flex justify-between ">
				<img src="./assets/Open-Status.png">
				<p class="text-red-500 bg-red-200 px-8 rounded-xl py-1">${element.priority}</p>
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