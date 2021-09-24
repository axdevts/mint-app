import { useEffect, useState } from "react";
import axios from "axios";
import {
	connectWallet,
	getCurrentWalletConnected,
	mintNFT,
	getOnAmount,
	handleSetPrice,
	handleUpdateUri
} from "./util/interact.js";

const Minter = (props) => {
	const [walletAddress, setWallet] = useState("");
	const [status, setStatus] = useState("");
	const [amount, setAmount] = useState("");
	const [price, setPrice] = useState("");
	const [tokenId, setTokenId] = useState("");

	const [mintNum, setMintNum] = useState("");
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [imageUrl, setImageUrl] = useState("");
	const [attri, setAttri] = useState("");
	// const [post, setPost] = useState(null);

	const baseURL = "http://localhost:8080/update-todo";
	const metaData = {
		"name": name,
		"description": description,
		"image": imageUrl,
		"attributes": [
			{
				"trait_type": "trait",
				"value": attri
			}
		]
	}

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

		const { success, status } = await mintNFT(mintNum, metaData);
		setStatus(status);
		if (success) {
			setMintNum("");
			setName("");
			setDescription("");
			setImageUrl("");
			setAttri("");
		}
	};

	const handleAmount = async () => {
		const { success, status } = await getOnAmount();
		setStatus(status);
		if (success) {
			console.log('success get amount')
		}
	}

	const handlePrice = async () => {
		const { success, status } = await handleSetPrice(price);
		setStatus(status);
		if (success) {
			console.log('success set price')
		}
	}

	const updateUri = async () => {
		const { success, status } = await handleUpdateUri(tokenId, imageUrl);
		setStatus(status);
		if (success) {
			console.log('success update metadata uri')
		}
	}

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
				<input
					type="text"
					placeholder="Please type name"
					onChange={(event) => setName(event.target.value)}
				/>

				<input
					tuype="text"
					placeholder="Please type description"
					onChange={(event) => setDescription(event.target.value)}
				/>
				<input
					type="text"
					className="mt-4"
					placeholder="Please type image url"
					onChange={(event) => setImageUrl(event.target.value)}
				/>
				<button id="set-uri" className="mt-4" onClick={updateUri}>Update Uri</button>
				<input
					type="text"
					placeholder="Please type attributes"
					onChange={(event) => setAttri(event.target.value)}
				/>
			</form>
			<button id="mintButton" className="mt-4" onClick={onMintPressed}>
				Mint NFT
			</button>

			<div className="mt-4">
				<button id="getAmountButton" onClick={handleAmount}>
					Get Amount
				</button>
				{amount &&
					<span>{amount}</span>
				}
			</div>

			<input type="text" className="price mt-4" placeholder="price" onChange={(event) => setPrice(event.target.value)} />
			<input type="text" className="tokenid" placeholder="token id" onChange={(event) => setTokenId(event.target.value)} />
			<button id="set-price" className="mt-4" onClick={handlePrice}>Set Price</button>

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
