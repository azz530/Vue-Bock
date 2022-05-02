import service from "./index";

const login = (data) => {
    service.post('api/login',data)
};
export default {
    login,
}