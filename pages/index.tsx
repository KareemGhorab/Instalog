import { useEffect, useState } from "react"
import { useForm, SubmitHandler } from "react-hook-form"

import useFetch from "hooks/useFetch"
import { EventLog } from "interfaces/EventLog"

import Table from "components/home/table"

type Inputs = {
	search: string
}

export default function Home() {
	const [params, setParams] = useState<{ page: number; search?: string }>({
		page: 1,
	})
	const [fullList, setFullList] = useState<EventLog[]>([])
	const [isLive, setIsLive] = useState(false)
	const { data, isLoading } = useFetch({
		baseURL: "/api",
		url: "/events",
		params,
	})
	const { register, handleSubmit } = useForm<Inputs>()
	const onSubmit: SubmitHandler<Inputs> = (data) => {
		setFullList([])
		setParams({ page: 1, search: data.search })
	}

	useEffect(() => {
		if (!data) return
		setFullList((prev) => {
			return [...prev, ...data.documents]
		})
	}, [data])

	return (
		<main
			className="min:h-screen
    flex justify-center items-center
	p-10
    lg:p-24"
		>
			<div
				className="border rounded-xl border-primary-100
        w-full min:h-full
		overflow-hidden
		flex flex-col justify-between"
			>
				<div>
					<form
						onSubmit={handleSubmit(onSubmit)}
						className="bg-primary-200 p-5 w-full
						flex"
					>
						<input
							{...register("search")}
							className="w-full rounded-r-none text-primary-700"
							placeholder="Search name, email or action..."
							type="text"
						/>
						<fieldset
							className="text-primary-700 border-primary-400
						border border-l-0 rounded-r-lg text-xs
						flex"
						>
							<button
								type="submit"
								className="
							flex justify-center items-center gap-1
							px-3  border-primary-400 border-r"
							>
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
							<button
								className="px-3
							flex justify-center items-center gap-1
							border-primary-400 border-r"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 24 24"
									fill="currentColor"
									className="w-4 h-4"
								>
									<path d="M12 1.5a.75.75 0 01.75.75V7.5h-1.5V2.25A.75.75 0 0112 1.5zM11.25 7.5v5.69l-1.72-1.72a.75.75 0 00-1.06 1.06l3 3a.75.75 0 001.06 0l3-3a.75.75 0 10-1.06-1.06l-1.72 1.72V7.5h3.75a3 3 0 013 3v9a3 3 0 01-3 3h-9a3 3 0 01-3-3v-9a3 3 0 013-3h3.75z" />
								</svg>
								EXPORT
							</button>
							<button
								className="px-3
							flex justify-center items-center gap-1"
							>
								<div
									className={`w-3 h-3 rounded-full ${
										isLive ? "bg-green-500" : "bg-red-500"
									}`}
								></div>
								LIVE
							</button>
						</fieldset>
					</form>
					<section>
						<Table events={fullList} isLoading={isLoading} />
					</section>
				</div>
				<button
					onClick={() =>
						setParams((prev) => ({ ...prev, page: prev.page + 1 }))
					}
					className="w-full bg-primary-200
				text-center text-primary-600 font-semibold
				py-3 mt-5"
				>
					LOAD MORE
				</button>
			</div>
		</main>
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
