/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx}",
		"./components/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			colors: {
				primary: {
					100: "#f5f5f5",
					200: "#f8f8f8",
					300: "#959595",
					500: "#616161",
					800: "#1c1c1c",
				},
			},
		},
	},
	plugins: [],
}
