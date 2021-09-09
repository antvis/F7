import { Scene, PointLayer } from "@antv/l7"
import { Map } from '@antv/l7-maps';

import SelectorQuery from '../_utils/selector';

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

    const map = new Map({
      hash: true,
      center,
      pitch,
      zoom,
    });

    let canvasElement = await SelectorQuery.element('map')

    const scene = new Scene({
      id: id,
      // @ts-ignore
      canvas: canvasElement,
      map: map,
      hasBaseMap: true,
    });

    const pointData = [
      {
        lng: 120.131441,
        lat: 30.279383,
      }
    ];
       
    let layer = new PointLayer({
      zIndex: 2
    })
     .source(pointData, {
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

    scene.on('loaded', () => {
      scene.addLayer(layer)
    })
  },
  didUnmount() {},
  onError() {},
  methods: {
    onCanvasReady() {},
    regionchange() {
      console.log('region change');
    },
  },
});
