import SearchBar from "components/home/SearchBar"
import Table from "components/home/table/table"
import CSV from "components/home/buttons/CSV"
import Live from "components/home/buttons/live"
import Filter from "components/home/buttons/filter"
import LoadMore from "components/home/buttons/loadMore"
import RWDWrapper from "components/rwd/RWDWrapper"
import TableRWD from "components/rwd/table/tableRWD"

export default function Home() {
	return (
		<main className="min:h-screen flex--centered p-2 lg:p-24">
			<div className="card--main">
				<header className="flex--centered bg-primary-200 p-5 rounded-t-xl">
					<SearchBar />
					<Filter />
					<CSV />
					<Live />
				</header>
				<section>
					<Table />
				</section>
				<LoadMore />
			</div>
		</main>
	)
}
