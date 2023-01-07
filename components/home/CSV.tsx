import axios from "axios"
import React from "react"
import { CSVLink } from "react-csv"

export default class DownloadUserCSVButton extends React.Component<any, any> {
	constructor(props: {}) {
		super(props)

		this.state = {
			list: [],
			loading: false,
		}
	}

	get = (event: any, done: any) => {
		if (!this.state.loading) {
			this.setState({
				loading: true,
			})
			axios
				.get("/api/users")
				.then((userListJson) => {
					this.setState({
						list: userListJson,
						loading: false,
					})
					done(true)
				})
				.catch(() => {
					this.setState({
						loading: false,
					})
					done(false)
				})
		}
	}
	dataFromList = () => {
		return this.state.list
	}

	render() {
		const { loading } = this.state
		return (
			<CSVLink data={this.dataFromList} asyncOnClick={true} onClick={this.get}>
				Download
			</CSVLink>
		)
	}
}
