import {
	getFormattedDate,
	getFormattedTotal,
	hideInvoices,
	unhideInvoices,
} from './_utilities.js';
import showInvoices from './showInvoices.js';
import showEditForm from './showEditForm.js';

export default function getDetails(invoices, { currentTarget }) {
	const invoiceID = currentTarget.dataset.id;
	const [invoice] = invoices.filter(i => i.id === invoiceID);

	hideInvoices();
	showDetails(invoices, invoice);
}

export function showDetails(invoices, invoice) {
	const detailDiv = document.createElement('div');
	detailDiv.classList.add('details', 'active');

	detailDiv.innerHTML = `
	<button class="btn btn-back">Go Back</button>
  <div class='details-header'>
    <div class='details-header__status'>
      <p class='details-header__status-text'>Status</p>
      <p class='tag tag-${invoice.status}'>${invoice.status}</p>
    </div>
    <div class='details-header__buttons'>
      <button class='btn btn-info'>Edit</button>
      <button class='btn btn-danger'>Delete</button>
    </div>
  </div>
  <div class='details-body'>
  <div class='details-body__id'>
    <p class='invoice__id'>
      <span>#</span>${invoice.id}
    </p>
    <p class='details-body__id-text'>${invoice.description}</p>
  </div>
  <div class='details-body__address'>
    <p>${invoice.senderAddress.street}</p>
    <p>${invoice.senderAddress.city}</p>
    <p>${invoice.senderAddress.postCode}</p>
    <p>${invoice.senderAddress.country}</p>
  </div>
  <div class='details-body__dates'>
    <div class='date'>
      <p class='date__title'>invoice date</p>
      <p class='date__day'>${getFormattedDate(invoice.createdAt)}</p>
    </div>
    <div class='date'>
      <p class='date__title'>payment due</p>
      <p class='date__day'>${getFormattedDate(invoice.paymentDue)}</p>
    </div>
  </div>
  <div class='details-body__bill'>
    <p>Bill To</p>
    <p class='details-body__bill-name'>${invoice.clientName}</p>
    <p>${invoice.clientAddress.street}</p>
    <p>${invoice.clientAddress.city}</p>
    <p>${invoice.clientAddress.postCode}</p>
    <p>${invoice.clientAddress.country}</p>
  </div>
  <div class='details-body__sent'>
    <p>Sent to</p>
    <p class='details-body__sent-mail'>${invoice.clientEmail}</p>
  </div>
  <div class='details-body__table-wrap'>
    <table class='details-body__table'>
      <thead>
        <th>Item Name</th>
        <th>QTY.</th>
        <th>Price</th>
        <th>Total</th>
      </thead>
      <tbody>
        ${getTableRows(invoice.items)}
      </tbody>
    </table>
    <div class='details-body__table-footer'>
      <p>Amound Due</p>
      <p>${getFormattedTotal(invoice.total)}</p>
    </div>
  </div>
</div>
  `;

	detailDiv
		.querySelector('.btn-back')
		.addEventListener('click', () => removeDetails(detailDiv));

	detailDiv
		.querySelector('.btn-danger')
		.addEventListener('click', () =>
			deleteInvoice(invoices, invoice, detailDiv)
		);
	detailDiv
		.querySelector('.btn-info')
		.addEventListener('click', () =>
			showEditForm(invoices, invoice, detailDiv)
		);
	document.body.appendChild(detailDiv);
}

function removeDetails(div) {
	div.remove();
	unhideInvoices();
}

function deleteInvoice(invoices, invoice, div) {
	const idx = invoices.indexOf(invoice);
	invoices.splice(idx, 1);
	removeDetails(div);
	showInvoices(invoices);
}

function getTableRows(items) {
	let rows = '';

	items.forEach(item => {
		rows += `
      <tr>
        <td>${item.name}</td>
        <td>${item.quantity}</td>
        <td>${getFormattedTotal(item.price)}</td>
        <td>${getFormattedTotal(item.total)}</td>
      </tr>
    `;
	});

	return rows;
}
