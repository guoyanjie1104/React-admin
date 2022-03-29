import store from 'store'
export default {
    saveUser(user) {
        // localStorage.setItem('username', JSON.stringify(user))
        store.set('username',user)
    },
    getUser() {
        // return JSON.parse(localStorage.getItem('username') || '{}')
        return store.get('username')||{}
    },
    removeUser() {
        // localStorage.removeItem('username')
        store.remove('username')
    }
}