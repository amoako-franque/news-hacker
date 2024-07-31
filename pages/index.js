import fetch from "isomorphic-fetch"
import Error from "next/error"
import Link from "next/link"
import StoryList from "../components/StoryList"
import Layout from "../components/Layout"
import { useEffect, useState } from "react"

const Index = () => {
	const [state, setState] = useState([])

	useEffect(() => {
		fetchNews()
	}, [])

	let stories
	let page
	const fetchNews = async (page) => {
		try {
			page = Number(page) || 1
			const res = await fetch(
				`https://node-hnapi.herokuapp.com/news?page=${page}`
			)
			stories = await res.json()
			setState(stories)
			console.log(stories)
		} catch (err) {
			console.log(err)
			stories = []
		}

		return { stories }
	}

	return (
		<Layout
			title="Hacker Next"
			description="A Hacker News clone made with Next.js">
			<StoryList stories={state} />

			<footer>
				<Link href={`/?page=${page + 1}`}>
					<a>Next Page ({page + 1})</a>
				</Link>
			</footer>

			<style jsx>{`
				footer {
					padding: 1em;
				}
				footer a {
					font-weight: bold;
					color: black;
					text-decoration: none;
				}
			`}</style>
		</Layout>
	)
}

export default Index
