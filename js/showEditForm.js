import showInvoices from './showInvoices.js';
import { showDetails } from './showDetails.js';
import {
	removeDiv,
	updatePrice,
	addItem,
	getItemArr,
	getPaymentDue,
	getTotal,
	unhideInvoices,
} from './_utilities.js';

export default function showEditForm(invoices, invoice, detailDiv) {
	const formDiv = document.createElement('div');
	formDiv.classList.add('form');
	formDiv.innerHTML = `
  <h2 class="form__title">Edit ${invoice.id}</h2>
  <div class="form__body">
    <div>
      <h3 class="form__section-title">bill from</h3>
      <div class="form__billfrom-wrapper">
        <div class="input">
          <label class="input__label">street address</label>
          <input type="text" class="input__field" data-sender-street value="${invoice.senderAddress.street}"/>
        </div>
        <div class="input">
          <label class="input__label">city</label>
          <input type="text" class="input__field" data-sender-city value="${invoice.senderAddress.city}"/>
        </div>
        <div class="input">
          <label class="input__label">post code</label>
          <input type="text" class="input__field" data-sender-postcode value="${invoice.senderAddress.postCode}"/>
        </div>
        <div class="input">
          <label class="input__label">country</label>
          <input type="text" class="input__field" data-sender-country value="${invoice.senderAddress.country}"/>
        </div>
      </div>
    </div>
  
    <div>
      <h3 class="form__section-title">bill to</h3>
      <div class="form__billto-wrapper">
        <div class="input">
          <label class="input__label">client's name</label>
          <input type="text" class="input__field" data-client-name value="${invoice.clientName}"/>
        </div>
        <div class="input">
          <label class="input__label">client's email</label>
          <input type="email" class="input__field" data-client-email value="${invoice.clientEmail}"/>
        </div>
        <div class="input">
          <label class="input__label">street address</label>
          <input type="text" class="input__field" data-client-street value="${invoice.clientAddress.street}"/>
        </div>
        <div class="flex">
          <div class="input">
            <label class="input__label">city</label>
            <input type="text" class="input__field" data-client-city value="${invoice.clientAddress.city}"/>
          </div>
          <div class="input">
            <label class="input__label">post code</label>
            <input type="text" class="input__field" data-client-postcode value="${invoice.clientAddress.postCode}"/>
          </div>
          <div class="input">
            <label class="input__label">country</label>
            <input type="text" class="input__field" data-client-country value="${invoice.clientAddress.country}"/>
          </div>
        </div>
        <div class="input">
          <label class="input__label">invoice date</label>
          <input type="date" class="input__field" data-client-createdat/>
        </div>
        <div class="input">
          <label class="input__label">payment terms</label>
          <select class="input__field" data-payterms>
            <option value="1">Net 1 Days</option>
            <option value="7">Net 7 Days</option>
            <option value="14">Net 14 Days</option>
            <option value="30">Net 30 Days</option>
          </select>
        </div>
        <div class="input">
          <label class="input__label">description</label>
          <input type="text" class="input__field" data-description value="${invoice.description}"/>
        </div>
      </div>
    </div>
  
    <div>
      <h3 class="form__section-title">item list</h3>
      <div class="items">
        <button class="btn btn-info" data-add-button>Add New Item</button>
      </div>
    </div>
  </div>
  <div class="form__footer">
    <button class="btn btn-info" data-discard-button>Discard</button>
    <div>
      <button class="btn btn-primary" data-save-button>Save & Send</button>
    </div>
  </div>
  `;

	addItems(invoice.items, formDiv.querySelector('[data-add-button]'));

	formDiv
		.querySelector('[data-discard-button]')
		.addEventListener('click', () => removeDiv(formDiv));
	formDiv
		.querySelector('[data-save-button]')
		.addEventListener('click', () =>
			getNewData(formDiv, invoices, invoice, detailDiv)
		);
	formDiv.querySelector('[data-add-button]').addEventListener('click', addItem);
	document.body.appendChild(formDiv);
}

function addItems(items, btn) {
	items.forEach(item => {
		const itemEl = document.createElement('div');
		itemEl.classList.add('item');

		itemEl.innerHTML = `
    <div class="input">
    <label class="input__label">item name</label>
    <input type="text" class="input__field" data-item-name value="${item.name}"/>
    </div>
    <div class="input">
    <label class="input__label">Qty.</label>
    <input type="number" class="input__field" data-qty value="${item.quantity}"/>
    </div>
    <div class="input">
    <label class="input__label">price</label>
    <input type="number" class="input__field" data-price value="${item.price}"/>
    </div>
    <div class="total">
    <p class="input__label">total</p>
    <p class="total__value" data-total>${item.total}</p>
    </div>
    <button class="btn btn-delete">
    <img src="assets/icon-delete.svg" alt="delete" />
    </button>
    `;

		itemEl
			.querySelector('.btn.btn-delete')
			.addEventListener('click', () => removeDiv(itemEl));
		itemEl
			.querySelector('[data-price]')
			.addEventListener('input', () => updatePrice(itemEl));
		itemEl
			.querySelector('[data-qty]')
			.addEventListener('input', () => updatePrice(itemEl));
		btn.before(itemEl);
	});
}

function getNewData(form, invoices, invoice, detailDiv) {
	const description = form.querySelector('[data-description]').value;
	const senderStreet = form.querySelector('[data-sender-street]').value;
	const senderCity = form.querySelector('[data-sender-city]').value;
	const senderPostCode = form.querySelector('[data-sender-postcode]').value;
	const senderCountry = form.querySelector('[data-sender-country]').value;
	const clientStreet = form.querySelector('[data-client-street]').value;
	const clientCity = form.querySelector('[data-client-city]').value;
	const clientPostCode = form.querySelector('[data-client-postcode]').value;
	const clientCountry = form.querySelector('[data-client-country]').value;
	const clientName = form.querySelector('[data-client-name]').value;
	const clientEmail = form.querySelector('[data-client-email]').value;
	const createdAt = form.querySelector('[data-client-createdat]').value;
	const due = +form.querySelector('[data-payterms]').value;
	const paymentDue = getPaymentDue(createdAt, due);
	const itemELs = form.querySelectorAll('.item');
	const items = getItemArr(itemELs);
	const total = getTotal(items);

	invoice.description = description;
	invoice.senderAddress.street = senderStreet;
	invoice.senderAddress.city = senderCity;
	invoice.senderAddress.postCode = senderPostCode;
	invoice.senderAddress.country = senderCountry;
	invoice.clientAddress.street = clientStreet;
	invoice.clientAddress.city = clientCity;
	invoice.clientAddress.postCode = clientPostCode;
	invoice.clientAddress.country = clientCountry;
	invoice.clientName = clientName;
	invoice.clientEmail = clientEmail;
	invoice.clientCountry = clientCountry;
	invoice.paymentDue = paymentDue;
	invoice.total = total;
	invoice.items = items;

	removeDiv(form);
	removeDiv(detailDiv);
	showInvoices(invoices);
	showDetails(invoices, invoice);
}
