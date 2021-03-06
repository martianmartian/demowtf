'use strict'
var app = angular.module("indexApp", [])
    .value("leftValue",{
        "background":["images/background/1.jpg","images/background/2.jpg","images/background/3.jpg"],
        "text":["haha","hehe"],
        "pic":["images/others/1.jpg","images/others/2.jpg"]
    })
    .component('leftPanel', {
        template: `
          <div class="leftnav">
             <h1 ng-click="showit(0)">背景</h1>
             <h1 ng-click="showit(1)">文字</h1>
             <h1 ng-click="showit(2)">图片</h1>
          </div>
          <div>
            <ul ng-if="which==0">
                <li ng-repeat="x in data.background">
                    <img alt=""
                      ng-src="{{ x }}"
                      ng-click="changebackground(x)">
                </li>
            </ul>
          </div>
          <div>
             <ul ng-if="which==1">
                <li ng-repeat="y in data.text">
                    <span> {{ y }}</span>
                </li>
             </ul>
          </div>
          <div>
              <ul ng-if="which==2">
                <li ng-repeat="z in data.pic">
                    <img ng-src="{{z}}" ng-click="addImg(z)" alt="">
                </li>
              </ul>
          </div>
          `,
        controller: function($scope,leftValue,centralValue) {
            $scope.data = leftValue;
            $scope.showit = function (index) {
                $scope.which = index
            }
            $scope.which = 0
            $scope.changebackground = function (url) {
                centralValue.background = {
                    "background":"url("+url+")"
                }
            }
            $scope.addImg = function (imgUrl) {
                var imgObj = angular.copy(centralValue.picproto);
                imgObj["img"]=imgUrl;
                console.log(centralValue);
                centralValue[centralValue.time()]["pic"].push(imgObj);

            }
        }
    })
    .value('centralValue',{
        background:"",
        time: function(){return this.currentseries.length-1},
        currentseries:[0], //series of integer to time
        series:[0,1],
        0:{
            "text":[],
            "pic":[]
        },
        1:{
            "text":[],
            "pic":[]
        },
        proto:{
            "text":[],
            "pic":[]
        },
        picproto:{
            "img":"images/others/1.jpg",
            "css":{
                "top":"10%",
                "left":"5%"
            }
        }
    })
    .component('centralPanel', {
        template: `
                    <h1>part central</h1>
                    <div id="center-c" class="center-c" ng-style="data.background" >
                      <span ng-repeat="t in data.currentseries">
                        <span ng-repeat="c in data[t]['pic']">
                          <img ng-src="{{ c['img']}}" ng-style="c['css']" alt="" />
                        </span>
                      </span>
                    </div>
                `,
        controller: function($scope,centralValue){
            $scope.data = centralValue;
        }
    })
    .component('bottomPanel', {
        template:
            `
                      <div>
                        <button ng-repeat="i in data.series"
                          ng-click="goTo(i)"
                          >{{i}}</button>

                          <button type="" ng-click="addTime()">+</button>
                          <button type="">-</button>
                      </div>
                      `,
        controller: function($scope,centralValue){
            $scope.data = centralValue
            $scope.goTo = function(i){
                centralValue.currentseries = []
                for (var to=0;to<i+1;to++){
                    centralValue.currentseries.push(to)
                }
            }
            $scope.addTime = function(){
                var newIndex = centralValue.series.length
                centralValue.series.push(newIndex)
                centralValue[newIndex] = centralValue.proto
            }
        }
    })
    .component('rightPanel', {
        template: '<h1>Hellow4</h1>',
        controller: function() {

        }
    });
app.controller("topCont",function ($scope) {
    $scope.preview = function () {
        alert("preview!!!")
    }
    $scope.save = function () {
        alert("save!!!")
    }
    $scope.issue = function () {
        alert("issue!!!")
    }
    $scope.exit = function () {
        alert("exit!!!")
    }
})