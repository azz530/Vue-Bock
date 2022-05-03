import service from "./index";

const login = (data) => service.post('api/login',data);
const register = (data) => service.post('api/register',data);

export default {
    login,
    register
}