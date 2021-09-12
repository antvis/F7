import { PointLayer } from '@antv/l7';

import Store from '../_utils/store';

Component({
  data: {
    source: [
      {
        lng: 120.131441,
        lat: 30.279383,
      },
    ],
  },

  didMount() {
    const scene = Store.$scene;

    console.log(scene, 'scene');

    if (!scene) return;
    const layer = new PointLayer()
      .source(this.data.source, {
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

    scene.on('loaded', () => scene.addLayer(layer));
  },
});
