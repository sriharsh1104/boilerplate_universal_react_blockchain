import Web3 from "web3";

/**CUTMIZE ADDRESS FOR SHOW */
export const custmizeAddress = (address: string) => {
    let firstFive = address.substring(0, 5);
    let lastFour = address.substring(address.length - 4);
    return firstFive + "..." + lastFour;
};

/**CONVERT NUMBER WITH DECIMALS FOR CONTRACT CALL */
export const convertWithDecimal = (value, decimal) => {
    if (value > 0) {
        if (isInt(value)) {
            value = parseInt(value);
            // value = BigNumber(value).multiply(decimal);
            value = Web3.utils.toBN(value).mul(Web3.utils.toBN(decimal)).toString()

        } else {
            value = value * decimal;
            value = toFixed(value);
            value = parseInt(value.toString().split(".")[0]);
            value = toFixed(value);
            // value = BigNumber(value);
            value = Web3.utils.toBN(value).toString()

        }
        return value.toString();
    } else {
        return 0;
    }
};

/**CHECK STRING IS NUMBER */
const isInt = (n) => {
    return n % 1 === 0;
};

/**REMOVE e FORM BIG NUMBER */
const toFixed = (x) => {
    if (Math.abs(x) < 1.0) {
        var e = parseInt(x.toString().split("e-")[1]);
        if (e) {
            x *= Math.pow(10, e - 1);
            x = "0." + new Array(e).join("0") + x.toString().substring(2);
        }
    } else {
        e = parseInt(x.toString().split("+")[1]);
        if (e > 20) {
            e -= 20;
            x /= Math.pow(10, e);
            x += new Array(e + 1).join("0");
        }
    }
    return x;
};

/**GET ERROR MESSAGE FORM ERROR OBJECT */
export const getError = (error: any) => {
    let errorMsg =
        error && error.message ? error.message : "Something went wrong";
    if (errorMsg.indexOf("execution reverted") > -1) {
        let msg = errorMsg
        msg = msg = msg.indexOf('execution reverted:') > -1 ? msg.split('execution reverted:')[1].split("{")[0] : msg;
        return msg;
    } else if (errorMsg.indexOf("INVALID_ARGUMENT") > -1) {
        return errorMsg.split("(")[0];
    } else if (errorMsg.indexOf("MetaMask Tx Signature") > -1) {
        let msg = errorMsg.replace("MetaMask Tx Signature:", "");
        return msg;
    } else {
        let err = errorMsg.split("*")[0].split(":")[1];
        if (err?.trim() === "insufficient funds for gas") {
            return err;
        } else {
            return errorMsg;
        }
    }
};

/**CREATE URL FOR API CALL WITH PARAMS */
export const formatUrl = (url, params) => {
    params =
        params && Object.keys(params).length > 0
            ? `?${new URLSearchParams(params).toString()}`
            : ``;
    return `${url}${params}`;
}

/**ALLOW ONLY STRING */
export const allowOnlyString = (inputString) => {
    let res = /^[a-zA-Z]+$/.test(inputString);
    return res;
}

/**SHOW VALUE WITH ONLY SELECTED DECIMALS */
export const fixedToDecimal = (value, decimals = 4) => {
    value = value && parseFloat(value) > 0 ? decimals === 2 ? value.toString().match(/^-?\d+(?:\.\d{0,2})?/)[0] : value.toString().match(/^-?\d+(?:\.\d{0,4})?/)[0] : 0
    return value;
};
