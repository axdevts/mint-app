import axios from "axios";
import { useState, useEffect } from "react";

const baseURL = "http://localhost:8080/update-todo";

export default function Ipfs() {
	const [post, setPost] = useState(null);

	useEffect(() => {
		axios
			.get(baseURL, {
				headers: {
					'Access-Control-Allow-Origin': true,
				},
				params: metaData,
				responseType: "json",
			})
			.then((response) => {
				console.log(response);
				setPost(response);
			});
	}, []);

	if (!post) return null;

	return (
		<div>
			<h1>{post.title}</h1>
			<p>{post.body}</p>
		</div>
	);
}