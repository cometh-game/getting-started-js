"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.ConnectOnboardConnector = void 0;
const ethers_1 = require("ethers");
const ComethProvider_1 = require("../ComethProvider");
const ComethWallet_1 = require("../ComethWallet");
function ConnectOnboardConnector({ apiKey, authAdapter, rpcUrl, baseUrl, uiConfig }) {
    return () => {
        return {
            label: 'Connect SDK',
            getIcon: () => __awaiter(this, void 0, void 0, function* () { return (yield Promise.resolve().then(() => __importStar(require('../../ui/images/comethLogoDark')))).default; }),
            getInterface: () => __awaiter(this, void 0, void 0, function* () {
                const { createEIP1193Provider } = yield Promise.resolve().then(() => __importStar(require('@web3-onboard/common')));
                const instance = new ComethWallet_1.ComethWallet(Object.assign({ authAdapter,
                    apiKey,
                    rpcUrl,
                    baseUrl }, (uiConfig !== null && uiConfig !== void 0 ? uiConfig : { uiConfig })));
                const instanceProvider = new ComethProvider_1.ComethProvider(instance);
                yield instance.connect();
                const provider = createEIP1193Provider(instanceProvider, {
                    eth_requestAccounts: () => __awaiter(this, void 0, void 0, function* () {
                        const address = instance.getAddress();
                        return [address];
                    }),
                    eth_chainId: () => __awaiter(this, void 0, void 0, function* () {
                        return ethers_1.ethers.utils.hexlify(instance.chainId);
                    }),
                    eth_getBalance: () => __awaiter(this, void 0, void 0, function* () {
                        var _a;
                        const balance = yield instanceProvider.getSigner().getBalance();
                        return (_a = balance === null || balance === void 0 ? void 0 : balance.toString()) !== null && _a !== void 0 ? _a : '0';
                    }),
                    eth_accounts: () => __awaiter(this, void 0, void 0, function* () {
                        return instanceProvider.eth_accounts();
                    })
                });
                provider.disconnect = () => instance.logout();
                return {
                    provider,
                    instance
                };
            })
        };
    };
}
exports.ConnectOnboardConnector = ConnectOnboardConnector;
