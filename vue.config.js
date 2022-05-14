
module.exports ={
    outputDir: './dist',//默认打包的文件名
    assetsDir: 'assets',//设置静态资源在同一个文件夹
    lintOnSave: process.env.NODE_ENV === "production" ? false : true,//是否开启eslint保存检测,有效值: true || false || 'error'
    //打包生成的清除map文件
    productionSourceMap:false,
    chainWebpack:config =>{
        config.when(process.env.NODE_ENV === 'production',config=>{
          config.entry('app').clear().add('./src/main-prod.js');
          config.set('externals',{
            vue:'Vue',
            'vue-router':'VueRouter',
            axios:'axios',
            'vue-quill-editor':'VueQuillEditor',
            'element-ui': 'ELEMENT',
            'moment':'moment',
          })
          config.plugin('html').tap(args=>{
            args[0].isProd = true;
            return args;
          })
        })
        config.when(process.env.NODE_ENV === 'development',config=>{
          config.entry('app').clear().add('./src/main-dev.js');
          config.plugin('html').tap(args=>{
            args[0].isProd = false;
            return args;
          })
        })
      }
}