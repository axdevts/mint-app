require("dotenv").config();
const { create } = require('ipfs-http-client')
const ipfsClient = create("http://167.99.110.177:5001");
const contractABI = require("../contract-abi.json");
const contractAddress = "0x9f468eDD86F7898F00187f31b04ec91340632270";
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

export const mintNFT = async (mintNum, metaData) => {
    if (mintNum.trim() == "") {
        return {
            success: false,
            status: "❗Please make sure field are completed before minting.",
        };
    }

    const metaDataInfo = {
        "name": "metaData.name",
        "description": "metaData.description",
        "image": "ipfsImg",
        "attributes": [
            {
                "trait_type": "trait",
                "value": "1"
            }
        ]
    }
    const newMetaDataInfo = JSON.stringify(metaDataInfo);
    // const fileDetails = {
    //     path: i,
    //     content: newMetaDataInfo
    // }
    // const options = {
    //     wrapWithDirectory: true,
    //     multihash: "QmTv49kC5t8qSbgfZCeUmqDr3shgF45xMFdCu5Ww7vZcZU"
    // }
    for (let i = 0; i < 10; i++) {
        const fileDetails = {
            path: `nft/${i}`,
            content: newMetaDataInfo
        }
        const options = {
            wrapWithDirectory: true,
            shardSplitThreshold: 100,
            multihash: "QmTv49kC5t8qSbgfZCeUmqDr3shgF45xMFdCu5Ww7vZcZU"
        }
        const result = await ipfsClient.add(fileDetails, options);
        console.log('result from ipfs', result.cid.toString());

    }
    // var result = await ipfsClient.add(fileDetails, options);
    // console.log('result info', result)
    // console.log('result from ipfs', result.cid.toString());

    // for (let i = 0; i < 10; i++) {
    //     const fileDetails = {
    //         path: `/test/${i}`,
    //         content: JSON.stringify({
    //             "name": `metaData.name${i}`,
    //             "description": `metaData.description${i}`,
    //             "image": `ipfsImg${i}`,
    //             "attributes": [
    //                 {
    //                     "trait_type": "trait",
    //                     "value": i
    //                 }
    //             ]
    //         })
    //     }
    //     // const writingFIleInfo = await ipfsClient.files.write(
    //     //     '/create',
    //     //     fileDetails,
    //     //     { create: true })
    //     const options = {
    //         wrapWithDirectory: true,
    //         multihash: "QmTv49kC5t8qSbgfZCeUmqDr3shgF45xMFdCu5Ww7vZcZU",
    //         progress: (prog) => console.log(`received: ${prog}`)
    //     }
    //     var ipfsHash = await ipfsClient.add(
    //         fileDetails,
    //         options
    //     );
    //     console.log('ipfs hash info', ipfsHash);
    // }


    return {
        success: true,
        status:
            "✅ Check out your transaction on Etherscan: https://rinkeby.etherscan.io/tx/"
    };

    // const metaDataUri = {
    //     "name": "test",
    //     "description": "test",
    //     "image": "https://ipfs.io/ipfs/QmQqzMTavQgT4f4T5v6PWBp7XNKtoPmC9jvn12WPT3gkSE",
    //     "attributes": [
    //         {
    //             "trait_type": "trait",
    //             "value": "1"
    //         }
    //     ]
    // }
    // const result = await ipfsClient.add(newParams);
    // const newMetaDataUri = result.cid.toString();
    // const tokenURI = `https://ipfs.io/ipfs/${newMetaDataUri}`;
    // console.log('tokenURI uri is------', tokenURI);

    // window.contract = new web3.eth.Contract(contractABI, contractAddress);

    // const transactionParameters = {
    //     to: contractAddress, // Required except during contract publications.
    //     from: window.ethereum.selectedAddress, // must match user's active address.
    //     data: window.contract.methods
    //         .buy(mintNum, metaDataUri)
    //         .encodeABI(),
    // };

    // try {
    //     const txHash = await window.ethereum.request({
    //         method: "eth_sendTransaction",
    //         params: [transactionParameters],
    //     });
    //     return {
    //         success: true,
    //         status:
    //             "✅ Check out your transaction on Etherscan: https://rinkeby.etherscan.io/tx/" +
    //             txHash,
    //     };
    // } catch (error) {
    //     return {
    //         success: false,
    //         status: "😥 Something went wrong: " + error.message,
    //     };
    // }
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
