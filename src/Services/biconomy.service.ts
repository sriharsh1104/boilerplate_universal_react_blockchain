import { Biconomy } from "@biconomy/mexa";
import { toBuffer } from "ethereumjs-util";
import Web3 from "web3";
import { ethers } from "ethers";
import { CHAIN_ID, RPC_URL, BICONOMY_API_KEY } from "../Constant";
let abi = require("ethereumjs-abi");

class BiconomyHelper {
    biconomy: any;
    web3: any;
    constructor() {
        this.connectBiconomy();
    }

    connectBiconomy = async () => {
        try {
            const provider = new Web3.providers.HttpProvider(RPC_URL) as any;
            this.biconomy = new Biconomy(provider, { walletProvider: provider, apiKey: BICONOMY_API_KEY });
            this.isBiconomyConnected();

        } catch (error) {
            console.log('error :>> ', error);
        }
    }

    async isBiconomyConnected() {
        return this.biconomy.onEvent(this.biconomy.ERROR, (error: any) => {
            console.log('Biconomy is disconnected', error);
        });
    }

    constructMetaTransactionMessage = (
        nonce: any,
        chainId: number,
        functionSignature: any,
        contractAddress: string
    ) => {
        return abi.soliditySHA3(
            ["uint256", "address", "uint256", "bytes"],
            [nonce, contractAddress, chainId, toBuffer(functionSignature)]
        );
    };

    getSignatureParameters = async (signature: any): Promise<any> => {
        if (!this.web3.utils.isHexStrict(signature)) {
            throw new Error(
                'Given value "'.concat(signature, '" is not a valid hex string.')
            );
        }
        var r: any = signature.slice(0, 66);
        var s: any = "0x".concat(signature.slice(66, 130));
        var v: any = "0x".concat(signature.slice(130, 132));
        v = await this.web3.utils.hexToNumber(v);

        if (![27, 28].includes(v)) v += 27;
        return {
            r: r,
            s: s,
            v: v,
        };
    };

    sendMethod = async (method: string, data: any, walletAddress: any, contractAddress: any, ABI:any) => {
        try {

            let ethersProvider: any;
            const { ethereum }: any = window;
            ethersProvider = new Web3(ethereum);
            ethersProvider = new ethers.providers.Web3Provider(
                ethereum as any
            )

            const walletProvider: any = ethersProvider.getSigner()

            this.web3 = new Web3(this.biconomy);

            const contract: any = new this.web3.eth.Contract(ABI, contractAddress);

            let nonce = await contract.methods.getNonce(walletAddress).call()

            let functionSignature = await contract.methods[method].apply(null, Array.prototype.slice.call(data)).encodeABI();

            let messageToSign = await this.constructMetaTransactionMessage(
                nonce,
                CHAIN_ID as any,
                functionSignature,
                contractAddress
            );

            const signature = await walletProvider.signMessage(messageToSign);

            let { r, s, v }: any = await this.getSignatureParameters(signature);

            const tx = await contract.methods.executeMetaTransaction(walletAddress, functionSignature, r, s, v).encodeABI();

            let estGas = await contract.methods.executeMetaTransaction(walletAddress, functionSignature, r, s, v).estimateGas({ from: walletAddress });
            let txParams = {
                from: walletAddress,
                to: contractAddress,
                value: "0x0",
                gasLimit: estGas,
                data: tx,
            };

            try {
                const provider = await this.biconomy;
                let result = await provider.send("eth_sendTransaction", [txParams]);
                return result
            } catch (error) {
                console.log("error", error);
                return false
            }
        } catch (error) {
            console.log("Error in catch", error);
        }
    };

    callMethod = async (method: string, data: any, contractAddress: any, ABI: any) => {
        try {
            const contract: any = new this.web3.eth.Contract(ABI, contractAddress);
            let result = await contract.methods[method].apply(null, Array.prototype.slice.call(data));
            return result;
        } catch (error) {
            console.log("Error in catch", error);
        }
    }
}
// eslint-disable-next-line
export default new BiconomyHelper();