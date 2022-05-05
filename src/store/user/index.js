
const state = {
    token:'',
    userInfo:{},
}
const mutations = {
    setToken(state,tokenStr){
        state.token = tokenStr;
    },
    setUser(state,user){
        state.userInfo = user;
    }
}
const actions = {}
const getters = {}
export default {
    state,
    mutations,
    actions,
    getters
}