import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { environment } from 'environments/environment';
@Injectable({
    providedIn: 'root',
})
export class EncrDecrService {
    constructor() {}

    encryptUsingAES256(data: any) {
        if (data) {
            const _key = CryptoJS.enc.Utf8.parse(environment.CRYPTO_SK);
            const _iv = CryptoJS.enc.Utf8.parse(environment.CRYPTO_IV);

            const encrypted = CryptoJS.AES.encrypt(JSON.stringify(data), _key, {
                keySize: 16,
                iv: _iv,
                mode: CryptoJS.mode.CBC,
                padding: CryptoJS.pad.Pkcs7,
            });
            return encrypted.toString();
        }
    }
    decryptUsingAES256(data: any) {
        if (data) {
            const _key = CryptoJS.enc.Utf8.parse(environment.CRYPTO_SK);
            const _iv = CryptoJS.enc.Utf8.parse(environment.CRYPTO_IV);
            const decrypted = CryptoJS.AES.decrypt(data, _key, {
                keySize: 16,
                iv: _iv,
                mode: CryptoJS.mode.CBC,
                padding: CryptoJS.pad.Pkcs7,
            }).toString(CryptoJS.enc.Utf8);
            return decrypted;
        }
    }
}
