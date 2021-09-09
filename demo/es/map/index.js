import _asyncToGenerator from "@babel/runtime/helpers/asyncToGenerator";
import _regeneratorRuntime from "@babel/runtime/regenerator";
import { Scene } from '@antv/l7-scene';
import { Map } from '@antv/l7-maps'; // import { registerCanvas } from '@antv/l7-utils';

import SelectorQuery from '../_utils/selector';
Component({
  data: {
    scene: null,
    mapCtx: null
  },
  props: {
    center: [120, 30],
    zoom: 12,
    pitch: 0,
    id: 'map'
  },
  didMount: function didMount() {
    var _this = this;

    return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
      var _this$props, center, pitch, zoom, id, map, resp, scene;

      return _regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _this$props = _this.props, center = _this$props.center, pitch = _this$props.pitch, zoom = _this$props.zoom, id = _this$props.id; // const $canvas = my.createOffscreenCanvas({
              //   width: '750',
              //   height: '750',
              //   type: '2d',
              // });
              // registerCanvas($canvas);

              map = new Map({
                hash: true,
                center: center,
                pitch: pitch,
                zoom: zoom
              });
              _context.next = 4;
              return SelectorQuery.node("#" + id);

            case 4:
              resp = _context.sent;
              console.log(resp, 'resp');
              scene = new Scene({
                id: id,
                // @ts-ignore
                canvas: resp.node,
                map: map,
                hasBaseMap: true
              });

              _this.setData({
                map: map,
                scene: scene
              });

            case 8:
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
    onCanvasReady: function onCanvasReady() {},
    regionchange: function regionchange() {
      console.log('region change');
    }
  }
});