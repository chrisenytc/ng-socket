# ngSocket [![BOWER version](https://badge-me.herokuapp.com/api/bower/chrisenytc/ng-socket.png)](http://badges.enytc.com/for/bower/chrisenytc/ng-socket)

Angular Module for Socket.io

## Requirements

 - AngularJS 1.0.5+
 - Socket.IO 0.9.16

## Installing

Simply download the `ngSocket.js` file and add it to your web application. Just make sure it's included after the AngularJS script.

## Usage

 1. Add the `ngSocket` module as a dependency in your AngularJS app;
 2. Inject the `$socket` factory wherever you need to use Socket.IO;
 3. You're done!

## Example
```html
<script src="angular.min.js"></script>
<script src="socket.io.js"></script>
<script src="ngSocket.js"></script>
<script>
    var myApp = angular.module('myApp', ['ngSocket']);
    myApp.controller('MyCtrl', ['$scope', '$socket', function($scope, $socket) {
        // Listening to an event
        $socket.on('someEvent', function(data) {
            $scope.data = data;
        });

        // Raising an event
        $scope.raise = function(message) {            
            $socket.emit('otherEvent', message);
        };
    }]);
</script>
``` 
## Cancelling a subscription automatically on scope destruction

If you want to unsubscribe from an event automatically on scope destruction, just pass the current scope to `on` method:

```javascript
$socket.on('someEvent', $scope, function(data) { 
... 
});
```
