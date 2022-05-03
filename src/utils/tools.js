
//深拷贝
function deepCopy(obj) {
    let newObj = Array.isArray(obj) ? [] : {};
    if (obj && typeof obj === 'object') {
        for (let key in obj) {
            if (obj[key] && typeof obj[key] === 'object') {
                newObj[key] = deepCopy(obj[i]);
            } else {
                newObj[key] = obj[i];
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

export default {
    deepCopy,
    debounce,
    throttle
}