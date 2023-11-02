import Document, { DocumentContext, DocumentInitialProps } from 'next/document';
import { ServerStyleSheet } from 'styled-components';


class MyDocument extends Document {
	static async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps> {
		const sheet = new ServerStyleSheet();
		const originalRenderPage = ctx.renderPage;

		try {
			ctx.renderPage = () => {
				return originalRenderPage({
					enhanceApp: (App) => (props) => sheet.collectStyles(<App {...props} />),
				});
			};

			const initialProps = await Document.getInitialProps(ctx);
			const styles = (
				<>
					{initialProps.styles}
					{sheet.getStyleElement()}
				</>
			);

			return {
				...initialProps,
				styles,
			};
		} finally {
			sheet.seal();
		}
	}
}

export default MyDocument;
