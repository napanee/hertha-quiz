import type { AppProps } from 'next/app';
import { DefaultTheme, ThemeProvider, createGlobalStyle } from 'styled-components';


const GlobalStyle = createGlobalStyle`
	@font-face {
		font-display: fallback;
		font-family: HerthaRegular;
		font-weight: inherit;
		font-style: normal;
		src: url('/fonts/Hertha-Regular.woff2') format('woff2');
	}

	@font-face {
		font-display: fallback;
		font-family: HerthaBlack;
		font-weight: inherit;
		font-style: normal;
		src: url('/fonts/Hertha-Black.woff2') format('woff2');
	}

	body {
		box-sizing: border-box;
		margin: 0;
		padding: 0;
	}

	html,
	body {
		// Allow better font smoothing:
		overflow: hidden;
		-moz-osx-font-smoothing: grayscale;
		-webkit-font-smoothing: antialiased;
		font-family: HerthaRegular, Verdana, Arial, sans-serif;
		font-weight: inherit;
		font-style: normal;
		font-variation-settings: 'wght' 100;
	}

	a {
		color: inherit;
		text-decoration: none;
	}

	* {
		box-sizing: border-box;
	}
`;

const theme: DefaultTheme = {
	borderRadius: '5px',
	palette: {
		common: {
			black: '#000000',
			white: '#FFFFFF',
		},
		primary: {
			main: '#0070f3',
			contrastText: '#FFFFFF',
		},
		secondary: {
			main: '#0070f3',
			contrastText: '#FFFFFF',
		},
	},
};

function App({ Component, pageProps }: AppProps) {
	return (
		<>
			<GlobalStyle />
			<ThemeProvider theme={theme}>
				<Component {...pageProps} />
			</ThemeProvider>
		</>
	);
}

export default App;
