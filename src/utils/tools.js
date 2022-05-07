import moment from 'moment'

//深拷贝
function deepCopy(obj) {
    let newObj = Array.isArray(obj) ? [] : {};
    if (obj && typeof obj === 'object') {
        for (let key in obj) {
            if (obj[key] && typeof obj[key] === 'object') {
                newObj[key] = deepCopy(obj[key]);
            } else {
                newObj[key] = obj[key];
            }
        }
    }
    return newObj;
}

//防抖
function debounce(fn, delays) {
    let timer = null;
    return function () {
        if (timer) {
            clearTimeout(timer);
        } else {
            timer = setTimeout(()=>{
                fn.call(this);
                timer = null;
            }, delays);
        }
    }
}

//节流
function throttle(fn,delays){
    let timer = null;
    let flag = true;
    return function(){
        if(flag){
            timer = setTimeout(()=>{
                fn.call(this);
                flag = true;
            },delays)
        } else {
            flag = false;
        }
    }
}

function formatDate (dateStr,type){ //格式('yyyy-mm-dd')
    if(dateStr!=null&&type!=null){
        return moment(dateStr).format(type);
    } else {
        return;
    } 
}




export default {
    deepCopy,
    debounce,
    throttle,
    formatDate
}