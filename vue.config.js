module.exports ={
    lintOnSave: process.env.NODE_ENV === "production" ? false : true,//是否开启eslint保存检测,有效值: true || false || 'error'
}