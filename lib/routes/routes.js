var userAPI    = require('./user'),
    channelAPI = require('./channel');

exports = module.exports = function(server, nodeManager){

  server.get ('/ping', function (req, res, next) { res.send({status : 'pong'}); });


  // *** [User API](./user.html) 
  server.get ('/user/:userId'     , userAPI.retrieve    ); 
  server.post('/user/register'    , userAPI.register    );
  server.post('/user/login'       , userAPI.login       );
  server.post('/user/logout'      , userAPI.logout      );


  // *** [Channel API](./channel.html) 
  server.post('/channel/create/:channel', channelAPI.create);
  server.post('/channel/join/:channel'  , channelAPI.join  );
  server.get ('/channel/list/:userId'   , channelAPI.list  );
  
  if(nodeManager) {
    
    var appAPIClass = require('./app').appAPI;
    var appAPI = new appAPIClass(nodeManager);


  // *** [application API](./app.html) 
    server.post('/app/create/:appNm', appAPI.create   );
    server.get ('/app/:appId',        appAPI.retrieve );
    server.post('/app/remove/:appId', appAPI.remove   );
    server.get ('/app/list',          appAPI.list     );
  }

  console.info('  - API resouces is applied (routed)'); 

};