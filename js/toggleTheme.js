export default function toggleTheme() {
	const bodyTheme = document.documentElement.dataset.theme;

	bodyTheme === 'light'
		? (document.documentElement.dataset.theme = 'dark')
		: (document.documentElement.dataset.theme = 'light');
}
