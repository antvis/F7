import { Scene, PointLayer } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import { dispatchTouchStart, dispatchTouchMove, dispatchTouchEnd, dispatchMapCameraParams } from '@antv/l7-utils';

import { SelectorQuery, message } from '../_utils';
import MiniTouch from '../map-ios/minaTouch';

function getMapSkew(direction) {
  if (direction === 'Up') {
    return 1;
  } else if (direction === 'Down') {
    return -1;
  } else {
    return 0;
  }
}
let startX = 0
let startY = 0


Component({
  data: {
    scene: null,
    mapCtx: null,
  },
  props: {
    center: [120, 30],
    zoom: 4,
    pitch: 0,
    id: 'map',
  },
  async didMount() {
    const { center, pitch, zoom, id } = this.props;
    this.onReady(this);

    const map = new Map({
      hash: true,
      center,
      pitch,
      zoom,
    });

    let canvasElement = await SelectorQuery.element(id);

    const scene = new Scene({
      id: id,
      // @ts-ignore
      canvas: canvasElement,
      map: map,
      hasBaseMap: true,
    });

    this.scene = scene;

    scene.on('loaded', () => {
      message.emit('scene:loaded', scene);
    });
  },
  didUnmount() {
    if (this.scene) {
      this.scene.destory();
    }
  },
  onError() {
  },
  methods: {
    onReady(_this) {
      _this.mapCtx = my.createMapContext('map');
      console.log(_this.mapCtx)
      console.log('onReady', _this)
      new MiniTouch(_this, 'touch1', {
        touchStart: function (e) {
          console.log('touchStart')
          startX = e.touches[0].clientX
          startY = e.touches[0].clientY
        },
        touchMove: function (e) {
          console.log('touchStart')
          // TODO: 避免其他手势对移动事件的影响
          if (e.type !== 'touchMove') {
            if (e.touches.length >= 3) {
              let touchSkew = _this.data.skew + getMapSkew(e.direction)
              touchSkew = Math.max(0, touchSkew)
              touchSkew = Math.min(40, touchSkew)
              _this.setData({
                skew: touchSkew
              })
            }
            return
          }
          let moveX = e.touches[0].clientX
          let moveY = e.touches[0].clientY
          if (startX == 0) startX = moveX
          if (startY == 0) startY = moveY
          let stepX = moveX - startX
          let stepY = moveY - startY
          startX = moveX
          startY = moveY

          _this.mapCtx.mapToScreen({
            latitude: _this.data.latitude,
            longitude: _this.data.longitude,
            success: res => {
              _this.mapCtx.screenToMap({
                x: res.x - stepX,
                y: res.y - stepY,
                success: e => {
                  _this.setData({
                    longitude: e.longitude,
                    latitude: e.latitude,
                  })
                }
              });
            }
          });
        },
        touchEnd: function (e) {
          startX = 0
          startY = 0
        },
        touchCancel: function () {
          console.log('touchCancel')
        },
        multipointStart: function () {
          // console.log('multipointStart');
        }, //一个手指以上触摸屏幕触发
        multipointEnd: function () {
          // console.log('multipointEnd');
        }, //当手指离开，屏幕只剩一个手指或零个手指触发(一开始只有一根手指也会触发)
        tap: function () {
          // console.log('Tap');
        }, //点按触发，覆盖下方3个点击事件，doubleTap时触发2次
        doubleTap: function () {
          // console.log('doubleTap');
        }, //双击屏幕触发
        longTap: function () {
          // console.log('longTap');
        }, //长按屏幕750ms触发
        singleTap: function () {
          // console.log('singleTap');
        }, //单击屏幕触发，包括长按
        rotate: function (evt) {
          // TODO: 避免在改变倾角时的影响
          if (evt.touches.length >= 3) {
            return
          }
          //evt.angle代表两个手指旋转的角度
          let rotateAngle = _this.data.rotate - evt.angle
          // TODO: 支持左右旋转 （小程序地图 rotate 只有正数有效）
          if (rotateAngle < 0) {
            rotateAngle = 360 + rotateAngle
          }
          _this.setData({
            rotate: rotateAngle
          })
        },
        pinch: function (evt) {
          // TODO: 避免在改变倾角时的影响
          if (evt.touches.length >= 3) {
            return
          }
          //evt.zoom代表两个手指缩放的比例(多次缩放的累计值),evt.singleZoom代表单次回调中两个手指缩放的比例
          // TODO: 控制缩放
          let pinchScale = _this.data.scale + (evt.singleZoom - 1) / 2.5
          // TODO: 限制缩放层级的范围
          pinchScale = Math.max(3, pinchScale)
          pinchScale = Math.min(20, pinchScale)
          _this.setData({
            scale: pinchScale
          })
        },
        pressMove: function (evt) {
          //evt.deltaX和evt.deltaY代表在屏幕上移动的距离,evt.target可以用来判断点击的对象
          // console.log(evt.target);
          // console.log(evt.deltaX);
          // console.log(evt.deltaY);
        },
        swipe: function (evt) {
          //在touch结束触发，evt.direction代表滑动的方向 ['Up','Right','Down','Left']
          // console.log('swipe:' + evt.direction);
        },
      })
    },
    onCanvasReady() { },
    regionchange() {
    },
    onTouchStart(e) {
      dispatchTouchStart(e)
    },
    onTouchMove(e) {
      dispatchTouchMove(e)
    },
    onTouchEnd(e) {
      dispatchTouchEnd(e)
    },
  },
});
