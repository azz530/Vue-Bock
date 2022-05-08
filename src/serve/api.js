import service from "./index";

const login = (data) => service.post('api/login',data);
const register = (data) => service.post('api/register',data);
const logout = (data) => service.post('my/logout',data);

const editorUserInfo = (data) => service.post('my/editorUserInfo',data);
const getUserInfo = (data) => service.get('my/getUserInfo',{params:data});
const getMyArticle = (data) => service.get('my/getMyArticle',{params:data});
const addArticle = (data) => service.post('my/addArticle',data);
const getAllArticle = (data) => service.get('my/getAllArticle',{params:data});
const addCollection = (data) => service.post('my/addCollection',data);
const delCollection = (data) => service.post('my/delCollection',data);

export default {
    login,
    register,
    editorUserInfo,
    logout,
    getUserInfo,
    getMyArticle,
    addArticle,
    getAllArticle,
    addCollection,
    delCollection,
}