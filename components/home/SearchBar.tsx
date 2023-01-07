import { SubmitHandler, useForm } from "react-hook-form"

export default function SearchBar(props: {
	className?: string
	onSubmit: SubmitHandler<any>
}) {
	const { register, handleSubmit } = useForm()

	return (
		<form
			onSubmit={handleSubmit(props.onSubmit)}
			className="bg-primary-200 p-5 w-full flex"
		>
			<input
				{...register("search")}
				className="w-full rounded-r-none text-primary-700"
				placeholder="Search name, email or action..."
				type="text"
			/>
			<button type="submit" className="searchBar__btn border border-l-0">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					strokeWidth={1.5}
					stroke="currentColor"
					className="w-4 h-4"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12"
					/>
				</svg>
				FILTER
			</button>
		</form>
	)
}
