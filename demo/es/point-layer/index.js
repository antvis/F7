import { PointLayer } from '@antv/l7';
import message from '../_utils/message';
Component({
  data: {
    source: [{
      lng: 120.131441,
      lat: 30.279383
    }]
  },
  didMount: function didMount() {
    var _this = this;

    console.log('layer mount');
    message.on('scene:loaded', function (scene) {
      return _this.setup(scene, _this);
    });
  },
  methods: {
    setup: function setup(scene, ctx) {
      console.log(scene, ctx, 'layer');
      var layer = new PointLayer().source(ctx.data.source, {
        parser: {
          type: 'json',
          x: 'lng',
          y: 'lat'
        }
      }).shape('circle').color('rgba(255, 0, 0, 1.0)').size(10).select(true).active(true);
      scene.addLayer(layer);
    }
  }
});