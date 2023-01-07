import React from "react"

export default function Live(props: { className?: string }) {
	return (
		<button className={`searchBar__btn border ${props.className}`}>
			<div className={`w-3 h-3 rounded-full`}></div>
			Live
		</button>
	)
}
