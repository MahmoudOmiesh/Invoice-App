export default async function getData() {
	const res = await fetch('../data/data.json');
	const data = await res.json();

	return data;
}
