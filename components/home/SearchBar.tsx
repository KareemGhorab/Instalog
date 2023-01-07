import { useEffect, useState } from "react"

export default function SearchBar(props: {
	className?: string
	onSubmit: Function
}) {
	const { className, onSubmit } = props

	const [search, setSearch] = useState("")

	function handleChange(e: React.FormEvent<HTMLInputElement>) {
		e.preventDefault()
		setSearch(e.currentTarget.value)
	}

	useEffect(() => {
		const timer = setTimeout(() => {
			onSubmit(search)
		}, 500)

		return () => {
			clearTimeout(timer)
		}
	}, [search, onSubmit])

	return (
		<div className={`bg-inherit w-full flex ${className}`}>
			<input
				value={search}
				onChange={handleChange}
				className="w-full rounded-r-none text-primary-700"
				placeholder="Search name, email or action..."
				type="text"
			/>
		</div>
	)
}
