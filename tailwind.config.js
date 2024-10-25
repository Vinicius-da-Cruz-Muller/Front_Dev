/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
	mode: "jit",
	theme: {
		extend: {
			gridTemplateColumns: {
				'desktop': 'repeat(12, minmax(32px, 64px))',
				'favoritos': 'repeat(18, minmax(32px, 64px))',
				'mobile': 'repeat(2, minmax(80px, 96px))',
				'tablets': 'repeat(6, minmax(40px, 68px))',

				'header': 'repeat(20, minmax(32px, 64px))',
				'headerDesktop': 'repeat(18, minmax(32px, 64px))',
				'headerMobile': 'repeat(3, minmax(80px, 96px))',
			},
			screens: {
				'tablet': '768px',
				'lg': '1024px',
			  },
		},
	},
	plugins: [],
};
