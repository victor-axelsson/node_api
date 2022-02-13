class Config {

    async init() {
        require('dotenv').config();
    }

    get crypto() {
        return {
            encryptionType: process.env.CRYPTO_ENCRYPTION_TYPE,
            decryptionType: process.env.CRYPTO_DECRYPTION_TYPE,
            keyType: process.env.CRYPTO_KEY_TYPE,
            ivType: process.env.CRYPTO_IV_TYPE,
            key: process.env.CRYPTO_KEY,
            iv: process.env.CRYPTO_IV
        }
    }
}

const config = new Config();
export default config; 