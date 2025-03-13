module.exports = {  
    context: `${__dirname}/src/js/`,  
    entry: {  
      app: './main.js',  
    },  
    output: {  
      filename: '[name].js',  
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
          }
          ]
      }
  };

