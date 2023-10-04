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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ethers_1 = require("ethers");
const safeService_1 = __importDefault(require("./safeService"));
const WALLET_ADDRESS = '0x5B76Bb156C4E9Aa322143d0061AFBd856482648D';
const CHAIN_ID = 137;
const COUNTER_TEST_ADDRESS = '0x84ADD3fa2c2463C8cF2C95aD70e4b5F602332160';
describe('safeService', () => {
    describe('getSafeTransactionHash', () => {
        const SAFE_TX_HASH = '0x684e524decf23a8540aa689f9c745b7579bf906f528e60a31b6123e1a7b94ed8';
        const transactionData = {
            to: COUNTER_TEST_ADDRESS,
            value: '0x0',
            data: '0x06661abd',
            operation: ethers_1.BigNumber.from(0).toString(),
            safeTxGas: ethers_1.BigNumber.from(0).toString(),
            baseGas: ethers_1.BigNumber.from(0).toString(),
            gasPrice: ethers_1.BigNumber.from(0).toString(),
            gasToken: ethers_1.ethers.constants.AddressZero,
            refundReceiver: ethers_1.ethers.constants.AddressZero,
            nonce: ethers_1.BigNumber.from(128).toString()
        };
        it('Given a walletAddress with transactionData, when predicting transaction Hash, then return the correct safe txHash', () => __awaiter(void 0, void 0, void 0, function* () {
            const predictedSafeTxHash = safeService_1.default.getSafeTransactionHash(WALLET_ADDRESS, transactionData, CHAIN_ID);
            expect(predictedSafeTxHash).toEqual(SAFE_TX_HASH);
        }));
    });
    describe('formatWebAuthnSignatureForSafe', () => {
        const SIGNER_ADDRESS = '0xc7a397eB9C91FAeB303cE286Cbd5c85eB8773Be5';
        const WEBAUTHN_SIGNATURE = '0x00000000000000000000000000000000000000000000000000000000000000a0000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000000244e541c13182bfef85ff8f9ea2d0939ecb8b1b106921e24a9088715f2086beb94d3b1ff0ff95e263da59b75b61d46531daecc504960c39efb06d93558b72c29f0000000000000000000000000000000000000000000000000000000000000002549960de5880e8c687434170f6476605b8fe4aeb9a28632c7995cf3ba831d9763050000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000867b2274797065223a22776562617574686e2e676574222c226368616c6c656e6765223a2253472d56495f466f48397552414e565f6c50684b43716f696832437579576c42645034774b562d53335555222c226f726967696e223a22687474703a2f2f6c6f63616c686f73743a38303030222c2263726f73734f726967696e223a66616c73657d0000000000000000000000000000000000000000000000000000';
        const FORMATTED_WEBAUTHN_SIGNATURE = '0x000000000000000000000000c7a397eb9c91faeb303ce286cbd5c85eb8773be500000000000000000000000000000000000000000000000000000000000000410000000000000000000000000000000000000000000000000000000000000001c000000000000000000000000000000000000000000000000000000000000000a0000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000000244e541c13182bfef85ff8f9ea2d0939ecb8b1b106921e24a9088715f2086beb94d3b1ff0ff95e263da59b75b61d46531daecc504960c39efb06d93558b72c29f0000000000000000000000000000000000000000000000000000000000000002549960de5880e8c687434170f6476605b8fe4aeb9a28632c7995cf3ba831d9763050000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000867b2274797065223a22776562617574686e2e676574222c226368616c6c656e6765223a2253472d56495f466f48397552414e565f6c50684b43716f696832437579576c42645034774b562d53335555222c226f726967696e223a22687474703a2f2f6c6f63616c686f73743a38303030222c2263726f73734f726967696e223a66616c73657d0000000000000000000000000000000000000000000000000000';
        it('Given a signerAddress and a webAuthn signature, when formatting the signature to the safe standard, then return the formatted signature', () => __awaiter(void 0, void 0, void 0, function* () {
            const signature = safeService_1.default.formatWebAuthnSignatureForSafe(SIGNER_ADDRESS, WEBAUTHN_SIGNATURE);
            expect(signature).toEqual(FORMATTED_WEBAUTHN_SIGNATURE);
        }));
    });
    describe('getTransactionsTotalValue', () => {
        const to = WALLET_ADDRESS;
        const value = '123456';
        const data = '0x';
        const transactionDataMultisend = [
            { to, value, data },
            { to, value, data },
            { to, value, data }
        ];
        it('Given a multisend array, when getting the total value of the transaction, then return the sum of the transactions value', () => __awaiter(void 0, void 0, void 0, function* () {
            const totalValue = yield safeService_1.default.getTransactionsTotalValue(transactionDataMultisend);
            expect(totalValue).toEqual((parseInt(value) * 3).toString());
        }));
    });
});
