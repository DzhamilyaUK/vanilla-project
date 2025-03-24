const path = require('path');

module.exports = {  
    context: `${__dirname}/src/js/`, 
    mode: 'development', 
    entry: {  
      app: './main.js',  
    },  
    output: {  
      filename: '[name].js',
      path: path.resolve(__dirname, 'build'),  
    },  
    resolve: {  
      alias: {  
        '@js': `${__dirname}/src/js`,  
      },  
      modules: [`${__dirname}/node_modules/`],  
      extensions: ['.js'],  
      symlinks: false,  
    },  
    module: {
        rules: [ 
          {
            test: /\.js$/,
            use: 'babel-loader',
            exclude: '/node_modules/'
          },
          ]
      }
  };

