
import Table from "components/home/table"
import SearchBar from "components/home/searchBar"
import useEvents from "hooks/useEvents"

export default function Home() {
	const { data, isLoading, error } = useEvents()

	console.log(data)

	return (
		<header
			className="h-screen
    flex justify-center items-center
    py-3"
		>
			<main
				className="border rounded-lg border-primary-100
        overflow-hidden"
			>
				<header className="bg-primary-200 p-5">
					<SearchBar />
				</header>
				<section>
					{isLoading ? <span>Loading</span> : <Table events={data.documents} />}
				</section>
			</main>
		</header>
	)
}

// export async function getStaticProps() {
// 	const article = await
// 	return {
// 		props: {
// 			fallback: {
// 				"/api/article": article,
// 			},
// 		},
// 	}
// }
