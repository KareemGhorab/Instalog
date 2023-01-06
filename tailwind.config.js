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
					100: "#f0f0f0",
					200: "#f5f5f5",
					300: "#f8f8f8",
					400: "#e0e0df",
					500: "#959595",
					600: "#616161",
					800: "#1c1c1c",
				},
			},
		},
		fontFamily: {
			inter: ["Inter", "sans-serif"],
		},
	},
	plugins: [],
}
