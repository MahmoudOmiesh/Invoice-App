import getDetails from './showDetails.js';
import { getFormattedDate, getFormattedTotal } from './_utilities.js';

export default function showInvoices(invoices) {
	const invoicesDiv = document.querySelector('.invoices');
	invoicesDiv.innerHTML = '';

	invoices.forEach(invoice => {
		const invoiceDiv = document.createElement('div');
		invoiceDiv.classList.add('invoice');
		invoiceDiv.dataset.id = invoice.id;
		invoiceDiv.innerHTML = `
     <p class="invoice__id"><span>#</span>${invoice.id}</p>
     <p class="invoice__date">Due ${getFormattedDate(invoice.paymentDue)}</p>
     <p class="invoice__name">${invoice.clientName}</p>
     <p class="invoice__price">${getFormattedTotal(invoice.total)}</p>
     <p class="tag tag-${invoice.status}">${invoice.status}</p>
    `;

		invoiceDiv.addEventListener('click', e => getDetails(invoices, e));
		invoicesDiv.appendChild(invoiceDiv);
	});

	updateInvoiceCount(invoices);
}

function updateInvoiceCount(invoices) {
	const invoiceCount = document.querySelector('.main-header__text p span');
	invoiceCount.textContent = invoices.length;
}
