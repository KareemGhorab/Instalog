import EventsProvider from "context/EventsContext"
import "../styles/globals.css"
import type { AppProps } from "next/app"

export default function App({ Component, pageProps }: AppProps) {
	return (
		<>
			<EventsProvider>
				<Component {...pageProps} />
			</EventsProvider>
		</>
	)
}
