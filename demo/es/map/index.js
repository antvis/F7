import _asyncToGenerator from "@babel/runtime/helpers/asyncToGenerator";
import _regeneratorRuntime from "@babel/runtime/regenerator";
import { Scene, Map } from '@antv/l7';
import { ctx } from '../_utils/ctx';
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
      var _this$props, center, pitch, zoom, id, map;

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
              ctx.createSelectorQuery().select("#" + id).fields({
                node: true,
                context: false,
                rect: true,
                computedStyle: ['height', 'width']
              }, function (res) {
                res.node.left = res.left;
                res.node.top = res.top;
                console.log(res, JSON.stringify(res.node), 'res');
                _this.scene = new Scene({
                  id: id,
                  // @ts-ignore
                  canvas: res.node,
                  map: map,
                  hasBaseMap: true
                });
              }).exec();

            case 3:
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
    onCanvasReady: function onCanvasReady() {//@ts-ignore
      // const { center, pitch, zoom, id } = this.props;
      // const map = new Map({
      //   hash: true,
      //   center,
      //   pitch,
      //   zoom,
      // });
      // ctx
      //   .createSelectorQuery()
      //   .select(`#${id}`)
      //   .fields(
      //     {
      //       node: true,
      //       context: false,
      //       rect: true,
      //       computedStyle: ['height', 'width'],
      //     },
      //     (res) => {
      //       res.node.left = res.left;
      //       res.node.top = res.top;
      //       console.log(res, JSON.stringify(res.node), 'res');
      //       this.scene = new Scene({
      //         id: id,
      //         // @ts-ignore
      //         canvas: res.node,
      //         map: map,
      //         hasBaseMap: true,
      //       });
      //     }
      //   )
      //   .exec();
    },
    regionchange: function regionchange() {
      console.log('region change');
    }
  }
});