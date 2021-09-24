require("dotenv").config();
const contractABI = require("../contract-abi.json");
const contractAddress = "0x5c0E7Dfde1868A26D923725419861af5387B7fC7";
const Web3 = require('web3');
const web3 = new Web3('https://rinkeby.infura.io/v3/ec74d1b14a7948388274b61bbd842489');

export const connectWallet = async () => {
	console.log('window ehtereum-----', window.ethereum);
	if (window.ethereum) {
		try {
			const addressArray = await window.ethereum.request({
				method: "eth_requestAccounts",
			});
			const obj = {
				status: "👆🏽 Write a message in the text-field above.",
				address: addressArray[0],
			};
			return obj;
		} catch (err) {
			return {
				address: "",
				status: "😥 " + err.message,
			};
		}
	} else {
		return {
			address: "",
			status: (
				<span>
					<p>
						{" "}
						🦊{" "}
						<a target="_blank" href={`https://metamask.io/download.html`}>
							You must install Metamask, a virtual Ethereum wallet, in your
							browser.
						</a>
					</p>
				</span>
			),
		};
	}
};

export const getCurrentWalletConnected = async () => {
	if (window.ethereum) {
		try {
			const addressArray = await window.ethereum.request({
				method: "eth_accounts",
			});
			if (addressArray.length > 0) {
				return {
					address: addressArray[0],
					status: "👆🏽 Write a message in the text-field above.",
				};
			} else {
				return {
					address: "",
					status: "🦊 Connect to Metamask using the top right button.",
				};
			}
		} catch (err) {
			return {
				address: "",
				status: "😥 " + err.message,
			};
		}
	} else {
		return {
			address: "",
			status: (
				<span>
					<p>
						{" "}
						🦊{" "}
						<a target="_blank" href={`https://metamask.io/download.html`}>
							You must install Metamask, a virtual Ethereum wallet, in your
							browser.
						</a>
					</p>
				</span>
			),
		};
	}
};

async function loadContract() {
	return new web3.eth.Contract(contractABI, contractAddress);
}

export const mintNFT = async (mintNum) => {
	if (mintNum.trim() == "") {
		return {
			success: false,
			status: "❗Please make sure field are completed before minting.",
		};
	}

	const metaDataUri = {
		"name": "test",
		"description": "test",
		"image": "QmfTho4g3XCdLNiuy22qgWGzPitkZXHXkkPhmqrCvN5otD",
		"attributes": [
			{
				"trait_type": "trait",
				"value": "1"
			}
		]
	}

	//make metadata
	//   const metadata = new Object();
	//   metadata.name = name;
	//   metadata.image = url;
	//   metadata.description = description;

	const tokenURI = 'test one';

	window.contract = new web3.eth.Contract(contractABI, contractAddress);

	const transactionParameters = {
		to: contractAddress, // Required except during contract publications.
		from: window.ethereum.selectedAddress, // must match user's active address.
		data: window.contract.methods
			.buy(mintNum, metaDataUri)
			.encodeABI(),
	};

	try {
		const txHash = await window.ethereum.request({
			method: "eth_sendTransaction",
			params: [transactionParameters],
		});
		return {
			success: true,
			status:
				"✅ Check out your transaction on Etherscan: https://rinkeby.etherscan.io/tx/" +
				txHash,
		};
	} catch (error) {
		return {
			success: false,
			status: "😥 Something went wrong: " + error.message,
		};
	}
};

export const getOnAmount = async () => {

	window.contract = new web3.eth.Contract(contractABI, contractAddress);

	const transactionParameters = {
		to: contractAddress, // Required except during contract publications.
		from: window.ethereum.selectedAddress, // must match user's active address.
		data: window.contract.methods
			.getAmount()
			.encodeABI(),
	};

	try {
		const txHash = await window.ethereum.request({
			method: "eth_getAmountTransaction",
			params: [transactionParameters],
		});
		return {
			success: true,
			status:
				"✅ Check out your transaction on Etherscan: https://rinkeby.etherscan.io/tx/" +
				txHash,
		};
	} catch (error) {
		return {
			success: false,
			status: "😥 Something went wrong: " + error.message,
		};
	}
};

export const handleSetPrice = async (price) => {

	window.contract = new web3.eth.Contract(contractABI, contractAddress);

	const transactionParameters = {
		to: contractAddress, // Required except during contract publications.
		from: window.ethereum.selectedAddress, // must match user's active address.
		data: window.contract.methods
			.setPrice(price)
			.encodeABI(),
	};

	try {
		const txHash = await window.ethereum.request({
			method: "eth_setPriceTransaction",
			params: [transactionParameters],
		});
		return {
			success: true,
			status:
				"✅ Check out your transaction on Etherscan: https://rinkeby.etherscan.io/tx/" +
				txHash,
		};
	} catch (error) {
		return {
			success: false,
			status: "😥 Something went wrong: " + error.message,
		};
	}
};


export const handleUpdateUri = async (tokenId, uri) => {

	window.contract = new web3.eth.Contract(contractABI, contractAddress);

	const transactionParameters = {
		to: contractAddress, // Required except during contract publications.
		from: window.ethereum.selectedAddress, // must match user's active address.
		data: window.contract.methods
			.updateMetadatauri(tokenId, uri)
			.encodeABI(),
	};

	try {
		const txHash = await window.ethereum.request({
			method: "eth_updateMetadataUriTransaction",
			params: [transactionParameters],
		});
		return {
			success: true,
			status:
				"✅ Check out your transaction on Etherscan: https://rinkeby.etherscan.io/tx/" +
				txHash,
		};
	} catch (error) {
		return {
			success: false,
			status: "😥 Something went wrong: " + error.message,
		};
	}
};
