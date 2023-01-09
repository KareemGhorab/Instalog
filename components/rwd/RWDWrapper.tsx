export default function RWDWrapper(props: { children: JSX.Element[] }) {
	return (
		<>
			<div className="lg:hidden">{props.children[0]}</div>
			<div className="hidden lg:block">{props.children[1]}</div>
		</>
	)
}
