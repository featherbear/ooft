import wasm from 'vncpasswd-js/src/d3des.wasm?init'
import loader from 'vncpasswd-js'

const asyncModule = wasm({}).then(instance => loader(instance))

export default {
    async encrypt(password: string, toHex = false) {
        const encrypted = await asyncModule.then(m => m.encrypt(password))
        if (toHex) return encrypted.map(s => s.toString(16)).join("")
        return encrypted
    },
    async decrypt(bytes: number[]) {
        return asyncModule.then(m => m.decrypt(bytes))
    },
}