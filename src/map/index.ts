import { Scene } from '@antv/l7-scene';
import { Map } from '@antv/l7-maps';
// import { registerCanvas } from '@antv/l7-utils';

import SelectorQuery from '../_utils/selector';

Component({
  data: {
    scene: null,
    mapCtx: null,
  },
  props: {
    center: [120, 30],
    zoom: 12,
    pitch: 0,
    id: 'map',
  },
  async didMount() {
    const { center, pitch, zoom, id } = this.props;

    // const $canvas = my.createOffscreenCanvas({
    //   width: '750',
    //   height: '750',
    //   type: '2d',
    // });

    // registerCanvas($canvas);

    const map = new Map({
      hash: true,
      center,
      pitch,
      zoom,
    });

    const resp = await SelectorQuery.node(`#${id}`);
    console.log(resp, 'resp');

    const scene = new Scene({
      id: id,
      // @ts-ignore
      canvas: resp.node,
      map: map,
      hasBaseMap: true,
    });

    this.setData({
      map,
      scene,
    });
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
