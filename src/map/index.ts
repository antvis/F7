import { Scene, PointLayer } from '@antv/l7';
import { Map } from '@antv/l7-maps';

import SelectorQuery from '../_utils/selector';
import Store from '../_utils/store';
import message from '../_utils/message';

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

    let canvasElement = await SelectorQuery.element('map');

    const scene = new Scene({
      id: id,
      // @ts-ignore
      canvas: canvasElement,
      map: map,
      hasBaseMap: true,
    });

    console.log('map mount',scene);

    scene.on('loaded', () => {
      console.log('scene loaded');
      
      message.emit('scene:loaded', scene);
    });

    Store.setScene(scene);
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
