import _asyncToGenerator from "@babel/runtime/helpers/asyncToGenerator";
import _regeneratorRuntime from "@babel/runtime/regenerator";
import { Scene, PointLayer } from "@antv/l7";
import { Map } from '@antv/l7-maps';
import { dispatchTouchStart, dispatchTouchMove, dispatchTouchEnd } from '@antv/l7-utils';
import MiniTouch from './minaTouch';
import { SelectorQuery } from '../_utils/selector';

function getMapSkew(direction) {
  if (direction === 'Up') {
    return 1;
  } else if (direction === 'Down') {
    return -1;
  } else {
    return 0;
  }
}

var startX = 0;
var startY = 0;
Component({
  data: {
    scene: null,
    mapCtx: null
  },
  props: {
    center: [120, 30],
    zoom: 4,
    pitch: 0,
    id: 'map'
  },
  didMount: function didMount() {
    var _this2 = this;

    return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
      var _this2$props, center, pitch, zoom, id, map, canvasElement, scene, pointData, layer;

      return _regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              console.log('ios did mount');

              _this2.onReady(_this2);

              _this2$props = _this2.props, center = _this2$props.center, pitch = _this2$props.pitch, zoom = _this2$props.zoom, id = _this2$props.id;
              map = new Map({
                hash: true,
                center: center,
                pitch: pitch,
                zoom: zoom
              });
              _context.next = 6;
              return SelectorQuery.element('map');

            case 6:
              canvasElement = _context.sent;
              scene = new Scene({
                id: id,
                // @ts-ignore
                canvas: canvasElement,
                map: map,
                hasBaseMap: true
              });
              pointData = [{
                lng: 120.131441,
                lat: 30.279383
              }];
              layer = new PointLayer({
                zIndex: 2
              }).source(pointData, {
                parser: {
                  type: 'json',
                  x: 'lng',
                  y: 'lat'
                }
              }).shape('circle').color('rgba(255, 0, 0, 1.0)').size(10).select(true).active(true);
              scene.on('loaded', function () {
                scene.addLayer(layer);
              });

            case 11:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }))();
  },
  didUnmount: function didUnmount() {},
  onError: function onError() {},
  methods: {
    onReady: function onReady(_this) {
      _this.mapCtx = my.createMapContext('map');
      console.log(_this.mapCtx);
      console.log('onReady', _this);
      new MiniTouch(_this, 'touch1', {
        touchStart: function touchStart(e) {
          console.log('touchStart');
          startX = e.touches[0].clientX;
          startY = e.touches[0].clientY;
        },
        touchMove: function touchMove(e) {
          console.log('touchStart'); // TODO: ??????????????????????????????????????????

          if (e.type !== 'touchMove') {
            if (e.touches.length >= 3) {
              var touchSkew = _this.data.skew + getMapSkew(e.direction);
              touchSkew = Math.max(0, touchSkew);
              touchSkew = Math.min(40, touchSkew);

              _this.setData({
                skew: touchSkew
              });
            }

            return;
          }

          var moveX = e.touches[0].clientX;
          var moveY = e.touches[0].clientY;
          if (startX == 0) startX = moveX;
          if (startY == 0) startY = moveY;
          var stepX = moveX - startX;
          var stepY = moveY - startY;
          startX = moveX;
          startY = moveY;

          _this.mapCtx.mapToScreen({
            latitude: _this.data.latitude,
            longitude: _this.data.longitude,
            success: function success(res) {
              _this.mapCtx.screenToMap({
                x: res.x - stepX,
                y: res.y - stepY,
                success: function success(e) {
                  _this.setData({
                    longitude: e.longitude,
                    latitude: e.latitude
                  });
                }
              });
            }
          });
        },
        touchEnd: function touchEnd(e) {
          startX = 0;
          startY = 0;
        },
        touchCancel: function touchCancel() {
          console.log('touchCancel');
        },
        multipointStart: function multipointStart() {// console.log('multipointStart');
        },
        //????????????????????????????????????
        multipointEnd: function multipointEnd() {// console.log('multipointEnd');
        },
        //???????????????????????????????????????????????????????????????(???????????????????????????????????????)
        tap: function tap() {// console.log('Tap');
        },
        //???????????????????????????3??????????????????doubleTap?????????2???
        doubleTap: function doubleTap() {// console.log('doubleTap');
        },
        //??????????????????
        longTap: function longTap() {// console.log('longTap');
        },
        //????????????750ms??????
        singleTap: function singleTap() {// console.log('singleTap');
        },
        //?????????????????????????????????
        rotate: function rotate(evt) {
          // TODO: ?????????????????????????????????
          if (evt.touches.length >= 3) {
            return;
          } //evt.angle?????????????????????????????????


          var rotateAngle = _this.data.rotate - evt.angle; // TODO: ?????????????????? ?????????????????? rotate ?????????????????????

          if (rotateAngle < 0) {
            rotateAngle = 360 + rotateAngle;
          }

          _this.setData({
            rotate: rotateAngle
          });
        },
        pinch: function pinch(evt) {
          // TODO: ?????????????????????????????????
          if (evt.touches.length >= 3) {
            return;
          } //evt.zoom?????????????????????????????????(????????????????????????),evt.singleZoom????????????????????????????????????????????????
          // TODO: ????????????


          var pinchScale = _this.data.scale + (evt.singleZoom - 1) / 2.5; // TODO: ???????????????????????????

          pinchScale = Math.max(3, pinchScale);
          pinchScale = Math.min(20, pinchScale);

          _this.setData({
            scale: pinchScale
          });
        },
        pressMove: function pressMove(evt) {//evt.deltaX???evt.deltaY?????????????????????????????????,evt.target?????????????????????????????????
          // console.log(evt.target);
          // console.log(evt.deltaX);
          // console.log(evt.deltaY);
        },
        swipe: function swipe(evt) {//???touch???????????????evt.direction????????????????????? ['Up','Right','Down','Left']
          // console.log('swipe:' + evt.direction);
        }
      });
    },
    onCanvasReady: function onCanvasReady() {},
    addMapCover: function addMapCover() {},
    regionchange: function regionchange() {
      console.log('region change');
    },
    onTouchStart: function onTouchStart(e) {
      dispatchTouchStart(e);
    },
    onTouchMove: function onTouchMove(e) {
      dispatchTouchMove(e);
    },
    onTouchEnd: function onTouchEnd(e) {
      dispatchTouchEnd(e);
    }
  }
});