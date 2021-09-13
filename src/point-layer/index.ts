import { PointLayer } from '@antv/l7';

import { message } from '../_utils';

Component({
  data: {
    source: [
      {
        lng: 120,
        lat: 30,
      },
    ],
  },

  didMount() {
    console.log('layer mount');
    message.on('scene:loaded', (scene) => this.setup(scene, this));
  },
  methods: {
    setup(scene, ctx) {
      console.log(scene, ctx, 'layer');
      const layer = new PointLayer({
        autoFit:true
      })
        .source(ctx.data.source, {
          parser: {
            type: 'json',
            x: 'lng',
            y: 'lat',
          },
        })
        .shape('circle')
        .color('rgba(255, 0, 0, 1.0)')
        .size(10)
        .select(true)
        .active(true);

      scene.addLayer(layer);
    },
  },
});
