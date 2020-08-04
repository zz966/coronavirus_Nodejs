const path = require('path');

module.exports = {
    devServer:{
        proxy:'http://localhost:3000'    
    //    outputDir:path.resolve(__dirname,'../public'),
    //     proxy:{
    //         '/':{
    //             target: 'http://localhost:3000/',
    //             changeOrigin: true,
    //         }

    //     }
    }
};