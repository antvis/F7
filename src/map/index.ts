import { Scene, PointLayer } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import { dispatchTouchStart, dispatchTouchMove, dispatchTouchEnd, dispatchMapCameraParams } from '@antv/l7-utils';

import { SelectorQuery, message } from '../_utils';

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
