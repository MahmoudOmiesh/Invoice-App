import showInvoices from './showInvoices.js';

const selectListOptionsDiv = document.querySelector(
	'.main .selectlist__options'
);
const selectListOptions = document.querySelectorAll(
	'.main .selectlist__options li'
);

export default function showSelectList(invoices) {
	selectListOptionsDiv.classList.toggle('active');

	initSelectListOptions(invoices);
}

function initSelectListOptions(invoices) {
	selectListOptions.forEach(option => {
		option.addEventListener('click', e => addOptionCheck(e, invoices));
	});
}

function addOptionCheck({ currentTarget }, invoices) {
	const prevOption = document.querySelector(
		'.main .selectlist__options li.checked'
	);
	const filterText = currentTarget
		.querySelector('.selectlist__option-text')
		.textContent.toLowerCase();

	if (prevOption) prevOption.classList.remove('checked');

	if (prevOption === currentTarget) {
		showInvoices(invoices);
	} else {
		currentTarget.classList.add('checked');
		filterInvoices(filterText, invoices);
	}
}

function filterInvoices(filterText, invoices) {
	const filteredInvoices = invoices.filter(
		invoice => invoice.status === filterText
	);

	showInvoices(filteredInvoices);
}
