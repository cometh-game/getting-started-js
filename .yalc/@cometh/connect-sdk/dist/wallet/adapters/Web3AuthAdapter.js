"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Web3AuthAdapter = void 0;
const modal_1 = require("@web3auth/modal");
const ethers_1 = require("ethers");
const IConnectionSigning_1 = require("../IConnectionSigning");
class Web3AuthAdapter extends IConnectionSigning_1.IConnectionSigning {
    constructor(web3authConfig, chainId, apiKey, baseUrl) {
        super(chainId, apiKey, baseUrl);
        this.web3auth = null;
        this.ethProvider = null;
        this.web3authConfig = web3authConfig;
    }
    connect() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.web3authConfig)
                throw new Error('Missing config for web3Auth');
            const web3auth = new modal_1.Web3Auth(this.web3authConfig);
            if (!web3auth)
                throw new Error('No Web3Auth created');
            yield web3auth.initModal();
            this.web3auth = web3auth;
            if (!this.web3auth)
                throw new Error('No Web3Auth instance found');
            yield this.web3auth.connect();
            this.ethProvider = new ethers_1.ethers.providers.Web3Provider((_a = this.web3auth) === null || _a === void 0 ? void 0 : _a.provider);
            const walletAddress = yield this.getWalletAddress();
            yield this.signAndConnect(walletAddress, this.getSigner());
        });
    }
    logout() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.web3auth)
                throw new Error('No Web3Auth instance found');
            yield this.web3auth.logout();
        });
    }
    getAccount() {
        return __awaiter(this, void 0, void 0, function* () {
            const signer = this.getSigner();
            if (!signer)
                throw new Error('No signer found');
            return yield signer.getAddress();
        });
    }
    getSigner() {
        if (!this.ethProvider)
            throw new Error('No Web3Auth provider found');
        return this.ethProvider.getSigner();
    }
    getWalletAddress() {
        return __awaiter(this, void 0, void 0, function* () {
            const ownerAddress = yield this.getAccount();
            if (!ownerAddress)
                throw new Error('No owner address found');
            return yield this.API.getWalletAddress(ownerAddress);
        });
    }
    getUserInfos() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.web3auth)
                throw new Error('No Web3Auth instance found');
            const userInfos = yield this.web3auth.getUserInfo();
            return userInfos !== null && userInfos !== void 0 ? userInfos : {};
        });
    }
}
exports.Web3AuthAdapter = Web3AuthAdapter;
