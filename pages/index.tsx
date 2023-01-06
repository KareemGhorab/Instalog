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
	const { data, isLoading } = useFetch({
		baseURL: "/api",
		url: "/events",
		params,
	})
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm<Inputs>()
	const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data)

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
						className="bg-primary-200 p-5 w-full"
					>
						<input
							{...register("search")}
							className="w-full"
							placeholder="Search name, email or action..."
							type="text"
						/>
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
