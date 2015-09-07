var appServices = angular.module('starter.services', []);

appServices.factory('Chats', function () {
    // Might use a resource here that returns a JSON array

    // Some fake testing data
    var chats = [{
        id: 0,
        name: 'Ben Sparrow',
        lastText: 'You on your way?',
        face: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png'
    }, {
        id: 1,
        name: 'Max Lynx',
        lastText: 'Hey, it\'s me',
        face: 'https://avatars3.githubusercontent.com/u/11214?v=3&s=460'
    }, {
        id: 2,
        name: 'Adam Bradleyson',
        lastText: 'I should buy a boat',
        face: 'https://pbs.twimg.com/profile_images/479090794058379264/84TKj_qa.jpeg'
    }, {
        id: 3,
        name: 'Perry Governor',
        lastText: 'Look at my mukluks!',
        face: 'https://pbs.twimg.com/profile_images/598205061232103424/3j5HUXMY.png'
    }, {
        id: 4,
        name: 'Mike Harrington',
        lastText: 'This is wicked good ice cream.',
        face: 'https://pbs.twimg.com/profile_images/578237281384841216/R3ae1n61.png'
    }];

    return {
        all: function () {
            return chats;
        },
        remove: function (chat) {
            chats.splice(chats.indexOf(chat), 1);
        },
        get: function (chatId) {
            for (var i = 0; i < chats.length; i++) {
                if (chats[i].id === parseInt(chatId)) {
                    return chats[i];
                }
            }
            return null;
        }
    };
});

appServices.factory('Categories', function ($http, $q) {
    return {
        all: function () {
            var dfd = $q.defer();
            $http.get('/categories')
                .success(function (categories) {
                    dfd.resolve(categories.data);
                })
                .error(function (err) {
                    dfd.reject(err);
                });

            return dfd.promise;
        }
    };
});

appServices.factory('Malls', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var malls = [{
    id: 0,
    name: 'שבעת הכוכבים',
    lat: '32.164984',
    long: '34.823771',
    face: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png'
  }, {
    id: 1,
    name: 'נתניה הכוכבים',
    lat: '32.164984',
    long: '34.444771',
    face: 'https://avatars3.githubusercontent.com/u/11214?v=3&s=460'
  }, {
    id: 2,
    name: 'שבעת דימונה',
    lat: '32.555584',
    long: '34.823771',
    face: 'https://pbs.twimg.com/profile_images/479090794058379264/84TKj_qa.jpeg'
  }, {
    id: 3,
    name: 'חיפה',
    lat: '30.164984',
    long: '34.823771',
    face: 'https://pbs.twimg.com/profile_images/491995398135767040/ie2Z_V6e.jpeg'
  }, {
    id: 4,
    name: 'ירושלים',
    lat: '32.555984',
    long: '34.223771',
    face: 'https://pbs.twimg.com/profile_images/578237281384841216/R3ae1n61.png'
  }];


  return {
    all: function() {
      return malls;
    },
    remove: function(mall) {
      malls.splice(malls.indexOf(mall), 1);
    },
    get: function(mallId) {
      for (var i = 0; i < malls.length; i++) {
        if (malls[i].id === parseInt(mallId)) {
          return malls[i];
        }
      }
      return null;
    }
  };
});

appServices.factory('Sales', function(MySales) {
    var sales = [{
      id: 0,
      name: '50% on NIKE',
      details: '50%',
      face: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png'
    }, {
      id: 1,
      name: 'Max Lynx',
      details: 'Hey, it\'s me',
      face: 'https://avatars3.githubusercontent.com/u/11214?v=3&s=460'
    },{
      id: 2,
      name: 'Adam Bradleyson',
      details: 'I should buy a boat',
      face: 'https://pbs.twimg.com/profile_images/479090794058379264/84TKj_qa.jpeg'
    }, {
      id: 3,
      name: 'Perry Governor',
      details: 'Look at my mukluks!',
      face: 'https://pbs.twimg.com/profile_images/491995398135767040/ie2Z_V6e.jpeg'
    }, {
      id: 4,
      name: 'Mike Harrington',
      details: 'This is wicked good ice cream.',
      face: 'https://pbs.twimg.com/profile_images/578237281384841216/R3ae1n61.png'
    }];

    return {
      all: function() {
        return sales;
      },
      remove: function(sale) {
        sales.splice(sales.indexOf(sale), 1);
      },
      get: function(saleId) {
        for (var i = 0; i < sales.length; i++) {
          if (sales[i].id === parseInt(saleId)) {
            return sales[i];
          }
        }
        return null;
      },
      add : function(sale){
        MySales.add(sale);
      }
    };
  });

appServices.factory('MySales', function() {
  var sales = [];

  return {
    all: function() {
      return sales;
    },
    remove: function(sale) {
      sales.splice(sales.indexOf(sale), 1);
    },
    get: function(saleId) {
      for (var i = 0; i < sales.length; i++) {
        if (sales[i].id === parseInt(saleId)) {
          return sales[i];
        }
      }
      return null;
    },
    add : function(sale){
      sale.id = sales.length;
      sales.push(sale);
    }
  };
});

appServices.factory('GeoAlert', function(Malls) {
  console.log('GeoAlert service instantiated');
  var interval;
  var duration = 6000;
  var long, lat;
  var processing = false;
  var callback;
  var minDistance = 10;

  // Credit: http://stackoverflow.com/a/27943/52160
  function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2-lat1);  // deg2rad below
    var dLon = deg2rad(lon2-lon1);
    var a =
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon/2) * Math.sin(dLon/2)
      ;
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = R * c; // Distance in km
    return d;
  }

  function deg2rad(deg) {
    return deg * (Math.PI/180)
  }

  function hb() {
    console.log('hb running');
    if(processing) return;
    processing = true;
    console.log('once');
    navigator.geolocation.getCurrentPosition(function(position) {
      processing = false;
      console.log("target location" + lat, long);
      console.log("my position " + position.coords.latitude, position.coords.longitude);
      var dist = getDistanceFromLatLonInKm(lat, long, position.coords.latitude, position.coords.longitude);
      console.log("dist in km is "+dist);
      if(dist <= minDistance) callback(position);
    },onError,{enableHighAccuracy: false});
  }

  function onError(error) {
    processing = false;
    alert('code: '    + error.code    + '\n' +
      'message: ' + error.message + '\n');
  }

  function sortDistance(malls){
    navigator.geolocation.getCurrentPosition(function(position){
      currentLat = position.coords.latitude;
      currentLong = position.coords.longitude;
      var length = malls.length;
      console.log(malls);
      for(var i = 0; i < length; i++){
        console.log(malls[i]);
        malls[i].distance = Math.round(getDistanceFromLatLonInKm(currentLat,currentLong,malls[i].lat,malls[i].long)*100)/100;
      }
      for(var i = 0; i < length; i++) {
        var tmp = malls[i]; //Copy of the current element.
        /*Check through the sorted part and compare with the
         number in tmp. If large, shift the number*/
        for(var j = i - 1; j >= 0 && (malls[j].distance > tmp.distance); j--) {
          //Shift the number
          malls[j+1] = malls[j];
        }
        //Insert the copied number at the correct position
        //in sorted part.
        malls[j+1] = tmp;
      }
      console.log('sorted');
      console.log(malls);
      return (malls);
    })


  }

  return {
    begin:function(lt,lg,cb) {
      long = lg;
      lat = lt;
      callback = cb;
      //interval = window.setInterval(hb, duration);
      //hb();
      sortDistance(Malls.all());
    },
    end: function() {
      window.clearInterval(interval);
    },
    setTarget: function(lg,lt) {
      long = lg;
      lat = lt;
    },
    getDistance: function(){
      mallList = Malls.all();
      return sortDistance(mallList);
    }
  };

});


appServices.factory('UserService', function ($rootScope, $http, $state, $ionicPopup) {
    var service = {
        model: {
            name: '',
            email: '',
            isLoggedIn: false
        },

        saveState: function () {
            sessionStorage.UserService = angular.toJson(service.model);
        },

        restoreState: function () {
            service.model = angular.fromJson(sessionStorage.UserService);
        },

        watchLoginChange: function () {
            var _self = this;
            FB.Event.subscribe('auth.statusChange', function (res) {
                if (res.status === 'connected') {
                    var userId = res.authResponse.userID;
                    var token = res.authResponse.accessToken;
                    _self.getUserInfo(userId, token);

                } else {
                    _self.logout();
                    console.log('not logged-in!');
                    $location.path('/login');
                }
            });
        },

        getUserInfo: function (userID, token) {
            var _self = this;
            $rootScope.$apply(function () {

                $http.get('/login' + '/' + userID + '/' + token)
                    .success(function (data) {
                        _self.loginRedirect(data);
                    })
                    .error(function (err) {
                        console.log('user info error: ', err);
                    });
            });
        },

        logout: function () {
            var _self = this;
            _self.model.email = '';
            _self.model.name = '';
            _self.model.isLoggedIn = false;
            _self.saveState();
        },

        loginRedirect: function (data) {
            var _self = this;
            if (!data || !data.data) {

                $ionicPopup.alert({
                    title: 'Login failed!',
                    template: 'Please check your credentials!'
                });
                return;
            }

            _self.model.email = data.data.email || data.data.data.email;
            _self.model.name = data.data.FirstName || data.data.data.FirstName;
            _self.model.isLoggedIn = true;
            _self.saveState();
            var path = 'login';
            var userCategories = data.data.Categories || data.data.data.Categories;
            if (userCategories && userCategories.length > 0) {

                //redirect to "main" page!
                path = 'tab.malls';
            } else {

                //redirect to "categories" page!
                path = 'categories';
            }
            console.log('---6');
            $state.go(path);
        }
    };

    $rootScope.$on('savestate', service.saveState);
    $rootScope.$on('restorestate', service.restoreState);

    return service;
});
