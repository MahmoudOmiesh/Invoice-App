import getData from './getData.js';
import showInvoices from './showInvoices.js';
import toggleTheme from './toggleTheme.js';
import showSelectList from './filterInvoices.js';
import showCreateForm from './showCreateForm.js';

const toggleThemeBtn = document.querySelector('.header__theme');
const selectList = document.querySelector('.main .selectlist__toggle');
const addInvoice = document.querySelector('[data-add-invoice]');

async function main() {
	let invoices = await getData();

	showInvoices(invoices);
	toggleThemeBtn.addEventListener('click', toggleTheme);
	selectList.addEventListener('click', () => showSelectList(invoices));
	addInvoice.addEventListener('click', () => showCreateForm(invoices));
}

main();
