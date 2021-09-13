import _asyncToGenerator from "@babel/runtime/helpers/asyncToGenerator";
import _regeneratorRuntime from "@babel/runtime/regenerator";
import { Scene } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import { dispatchTouchStart, dispatchTouchMove, dispatchTouchEnd } from '@antv/l7-utils';
import { SelectorQuery, message } from '../_utils';
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
    var _this = this;

    return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
      var _this$props, center, pitch, zoom, id, map, canvasElement, scene;

      return _regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _this$props = _this.props, center = _this$props.center, pitch = _this$props.pitch, zoom = _this$props.zoom, id = _this$props.id;
              map = new Map({
                hash: true,
                center: center,
                pitch: pitch,
                zoom: zoom
              });
              _context.next = 4;
              return SelectorQuery.element(id);

            case 4:
              canvasElement = _context.sent;
              scene = new Scene({
                id: id,
                // @ts-ignore
                canvas: canvasElement,
                map: map,
                hasBaseMap: true
              });
              _this.scene = scene;
              scene.on('loaded', function () {
                message.emit('scene:loaded', scene);
              });

            case 8:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }))();
  },
  didUnmount: function didUnmount() {
    if (this.scene) {
      this.scene.destory();
    }
  },
  onError: function onError() {},
  methods: {
    onCanvasReady: function onCanvasReady() {},
    regionchange: function regionchange() {},
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