export function getFormattedDate(date) {
	const dateInstance = new Date(date);
	const day = dateInstance.getDate();
	const month = dateInstance.toLocaleString('default', {
		month: 'short',
	});
	const year = dateInstance.getFullYear();

	const formattedDate = `${day} ${month} ${year}`;

	return formattedDate;
}

export function getFormattedTotal(total) {
	const formattedTotal = `£${total.toLocaleString()}`;
	return formattedTotal;
}

export function hideInvoices() {
	const mainDiv = document.querySelector('.main');
	mainDiv.classList.remove('active');
}
export function unhideInvoices() {
	const mainDiv = document.querySelector('.main');
	mainDiv.classList.add('active');
}

export function removeDiv(div) {
	div.remove();
}

export function updatePrice(item) {
	const price = +item.querySelector('[data-price]').value || 0;
	const qty = +item.querySelector('[data-qty]').value || 0;
	const total = item.querySelector('[data-total]');

	total.textContent = Math.floor(price * qty);
}

export function addItem({ currentTarget }) {
	const itemDiv = document.createElement('div');
	itemDiv.classList.add('item');

	itemDiv.innerHTML = `
    <div class="input">
    <label class="input__label">item name</label>
    <input type="text" class="input__field" data-item-name/>
    </div>
    <div class="input">
    <label class="input__label">Qty.</label>
    <input type="number" class="input__field" data-qty/>
    </div>
    <div class="input">
    <label class="input__label">price</label>
    <input type="number" class="input__field" data-price/>
    </div>
    <div class="total">
    <p class="input__label">total</p>
    <p class="total__value" data-total>0</p>
    </div>
    <button class="btn btn-delete">
    <img src="assets/icon-delete.svg" alt="delete" />
    </button>
  `;

	itemDiv
		.querySelector('.btn.btn-delete')
		.addEventListener('click', () => removeDiv(itemDiv));
	itemDiv
		.querySelector('[data-price]')
		.addEventListener('input', () => updatePrice(itemDiv));
	itemDiv
		.querySelector('[data-qty]')
		.addEventListener('input', () => updatePrice(itemDiv));
	currentTarget.before(itemDiv);
}

export function getItemArr(items) {
	const itemArr = [];

	items.forEach(item => {
		itemArr.push({
			name: item.querySelector('[data-item-name]').value,
			quantity: +item.querySelector('[data-qty]').value,
			price: +item.querySelector('[data-price]').value,
			total:
				+item.querySelector('[data-qty]').value *
				+item.querySelector('[data-price]').value,
		});
	});

	return itemArr;
}

export function getTotal(items) {
	let total = 0;
	items.forEach(item => {
		total += item.total;
	});

	return total;
}

export function getPaymentDue(date, due) {
	const dateObj = new Date(date);
	dateObj.setDate(dateObj.getDate() + due);
	return dateObj;
}
