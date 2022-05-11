import service from "./index";
 
const login = (data) => service.post('api/login',data);//用户登录
const register = (data) => service.post('api/register',data);//用户注册
const logout = (data) => service.post('my/logout',data);//用户退出登录

const editorUserInfo = (data) => service.post('my/editorUserInfo',data);//获取用户信息
const getUserInfo = (data) => service.get('my/getUserInfo',{params:data});//编辑用户信息


const getMyArticle = (data) => service.get('my/getMyArticle',{params:data});//获取用户文章信息
const addArticle = (data) => service.post('my/addArticle',data);//新增文章
const getAllArticle = (data) => service.get('my/getAllArticle',{params:data});//获取所有文章信息
const addCollection = (data) => service.post('my/addCollection',data);//将文章添加到收藏
const delCollection = (data) => service.post('my/delCollection',data);//将文章取消收藏
const getArticleDetails = (data) => service.get('my/getArticleDetails',{params:data});//获取文章详细页

const addComments = (data) => service.post('my/addComments',data);//对文章发表评论
const addReplay = (data) => service.post('my/addReplay',data);//对文章评论的回复

const addAlbum = (data) => service.post('my/addAlbum',data);//新增相册
const getMyAlbum = (data) => service.get('my/getMyAlbum',{params:data});//新增相册

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
    getArticleDetails,
    addComments,
    addReplay,
    addAlbum,
    getMyAlbum,
    
}