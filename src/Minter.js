import { useEffect, useState } from "react";
// import axios from "axios";
import {
	connectWallet,
	getCurrentWalletConnected,
	mintNFT,
} from "./util/interact.js";

const Minter = () => {
	const [walletAddress, setWallet] = useState("");
	const [status, setStatus] = useState("");

	const [mintNum, setMintNum] = useState("");
	// const [post, setPost] = useState(null);

	const baseURL = "http://localhost:8080/update-todo";

	useEffect(async () => {
		const { address, status } = await getCurrentWalletConnected();

		setWallet(address);
		setStatus(status);

		addWalletListener();
	}, []);

	function addWalletListener() {
		if (window.ethereum) {
			window.ethereum.on("accountsChanged", (accounts) => {
				if (accounts.length > 0) {
					setWallet(accounts[0]);
					setStatus("👆🏽 Write a message in the text-field above.");
				} else {
					setWallet("");
					setStatus("🦊 Connect to Metamask using the top right button.");
				}
			});
		} else {
			setStatus(
				<p>
					{" "}
					🦊{" "}
					<a target="_blank" href={`https://metamask.io/download.html`}>
						You must install Metamask, a virtual Ethereum wallet, in your
						browser.
					</a>
				</p>
			);
		}
	}

	const connectWalletPressed = async () => {
		const walletResponse = await connectWallet();
		setStatus(walletResponse.status);
		setWallet(walletResponse.address);
	};

	const onMintPressed = async () => {
		// const getData = await axios
		// 	.post(baseURL, {
		// 		metaData,
		// 	})
		// 	.then((response) => {
		// 		console.log(response);
		// 	}, (error) => {
		// 		console.log(error);
		// 	});
		// console.log(getData);

		const { success, status } = await mintNFT(mintNum);
		setStatus(status);
		if (success) {
			setMintNum("");
		}
	};

	// if (!post) return null;

	return (
		<div className="Minter">
			<button id="walletButton" onClick={connectWalletPressed}>
				{walletAddress.length > 0 ? (
					"Connected: " +
					String(walletAddress).substring(0, 6) +
					"..." +
					String(walletAddress).substring(38)
				) : (
					<span>Connect Wallet</span>
				)}
			</button>

			<br></br>
			<h1 id="title">NFT Minter</h1>
			<p>
				Please press "Mint."
			</p>
			<form>
				<input
					type="text"
					placeholder="Please type number"
					onChange={(event) => setMintNum(event.target.value)}
				/>
			</form>
			<button id="mintButton" className="mt-4" onClick={onMintPressed}>
				Mint NFT
			</button>

			<p id="status" style={{ color: "red" }}>
				{status}
			</p>

			{/* {post &&
				<>
					<h1>{post.title}</h1>
					<p>{post.body}</p>

				</>
			} */}
		</div>
	);
};

export default Minter;
