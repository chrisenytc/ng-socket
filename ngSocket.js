/*
 * ngSocket.js
 * https://github.com/chrisenytc/ng-socket
 *
 * Copyright (c) 2013 Christopher EnyTC, David Prothero
 * Licensed under the MIT license.
 */

// Module Copyright (c) 2013 Michael Benford

// Module for provide Socket.io support

(function () {
  'use strict';

  angular.module('ngSocket', [])
    .provider('$socket', socketProvider);

  function socketProvider() {
    var url;

    this.setUrl = setUrl;
    this.getUrl = getUrl;
    this.$get = ['$rootScope', socketFactory];

    function setUrl(value) {
      url = value;
    }

    function getUrl() {
      return url;
    }

    function socketFactory($rootScope) {
      var socket;

      var service = {
        addListener: addListener,
        on: addListener,
        once: addListenerOnce,
        removeListener: removeListener,
        removeAllListeners: removeAllListeners,
        emit: emit
      };

      return service;
      ////////////////////////////////

      function initializeSocket() {
        //Check if socket is undefined
        if (typeof socket === 'undefined') {
          if (url !== 'undefined') {
            socket = io.connect(url);
          } else {
            socket = io.connect();
          }
        }
      }

      function angularCallback(callback) {
        return function () {
          if (callback) {
            var args = arguments;
            $rootScope.$apply(function () {
              callback.apply(socket, args);
            });
          }
        };
      }

      function addListener(name, scope, callback) {
        initializeSocket();

        if (arguments.length === 2) {
          scope = null;
          callback = arguments[1];
        }

        socket.on(name, angularCallback(callback));

        if (scope !== null) {
          scope.$on('$destroy', function () {
            removeListener(name, callback);
          });
        }
      }

      function addListenerOnce(name, callback) {
        initializeSocket();
        socket.once(name, angularCallback(callback));
      }

      function removeListener(name, callback) {
        initializeSocket();
        socket.removeListener(name, angularCallback(callback));
      }

      function removeAllListeners(name) {
        initializeSocket();
        socket.removeAllListeners(name);
      }

      function emit(name, data, callback) {
        initializeSocket();
        socket.emit(name, data, angularCallback(callback));
      }
    }
  }

})();
