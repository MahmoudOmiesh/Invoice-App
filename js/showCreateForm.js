import showInvoices from './showInvoices.js';
import {
	removeDiv,
	addItem,
	getItemArr,
	getPaymentDue,
	getTotal,
} from './_utilities.js';

export default function showCreateForm(invoices) {
	const formDiv = document.createElement('div');
	formDiv.classList.add('form');
	formDiv.innerHTML = `
  <h2 class="form__title">Create Invoice</h2>
  <div class="form__body">
    <div>
      <h3 class="form__section-title">bill from</h3>
      <div class="form__billfrom-wrapper">
        <div class="input">
          <label class="input__label">street address</label>
          <input type="text" class="input__field" data-sender-street/>
        </div>
        <div class="input">
          <label class="input__label">city</label>
          <input type="text" class="input__field" data-sender-city/>
        </div>
        <div class="input">
          <label class="input__label">post code</label>
          <input type="text" class="input__field" data-sender-postcode/>
        </div>
        <div class="input">
          <label class="input__label">country</label>
          <input type="text" class="input__field" data-sender-country/>
        </div>
      </div>
    </div>
  
    <div>
      <h3 class="form__section-title">bill to</h3>
      <div class="form__billto-wrapper">
        <div class="input">
          <label class="input__label">client's name</label>
          <input type="text" class="input__field" data-client-name/>
        </div>
        <div class="input">
          <label class="input__label">client's email</label>
          <input type="email" class="input__field" data-client-email/>
        </div>
        <div class="input">
          <label class="input__label">street address</label>
          <input type="text" class="input__field" data-client-street/>
        </div>
        <div class="flex">
          <div class="input">
            <label class="input__label">city</label>
            <input type="text" class="input__field" data-client-city/>
          </div>
          <div class="input">
            <label class="input__label">post code</label>
            <input type="text" class="input__field" data-client-postcode/>
          </div>
          <div class="input">
            <label class="input__label">country</label>
            <input type="text" class="input__field" data-client-country/>
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
          <input type="text" class="input__field" data-description/>
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
      <button class="btn btn-info" data-draft-button>Save as Draft</button>
      <button class="btn btn-primary" data-save-button>Save & Send</button>
    </div>
  </div>
  `;

	formDiv
		.querySelector('[data-discard-button]')
		.addEventListener('click', () => removeDiv(formDiv));

	formDiv.querySelector('[data-add-button]').addEventListener('click', addItem);

	formDiv
		.querySelector('[data-save-button]')
		.addEventListener('click', () => getFormData(formDiv, invoices, 'pending'));
	formDiv
		.querySelector('[data-draft-button]')
		.addEventListener('click', () => getFormData(formDiv, invoices, 'draft'));
	document.body.appendChild(formDiv);
}

function getFormData(form, invoices, status) {
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

	const letterOne = String.fromCharCode(
		Math.floor(Math.random() * (90 - 65) + 65)
	).toUpperCase();
	const letterTwo = String.fromCharCode(
		Math.floor(Math.random() * (90 - 65) + 65)
	).toUpperCase();
	const number = Math.floor(Math.random() * (10000 - 1000) + 1000);

	const invoice = {
		id: `${letterOne}${letterTwo}${number}`,
		createdAt,
		clientName,
		clientEmail,
		description,
		paymentDue,
		status,
		senderAddress: {
			street: senderStreet,
			city: senderCity,
			postCode: senderPostCode,
			country: senderCountry,
		},
		clientAddress: {
			street: clientStreet,
			city: clientCity,
			postCode: clientPostCode,
			country: clientCountry,
		},
		items,
		total,
	};

	invoices.unshift(invoice);
	removeDiv(form);
	showInvoices(invoices);
}
