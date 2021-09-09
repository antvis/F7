import { Scene, Map } from '@antv/l7';

import { ctx } from '../_utils/ctx';
import { SelectorQuery } from '../_utils/dom';

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
      const map = new Map({
        hash: true,
        center,
        pitch,
        zoom,
      });
      ctx
        .createSelectorQuery()
        .select(`#${id}`)
        .fields(
          {
            node: true,
            context: false,
            rect: true,
            computedStyle: ['height', 'width'],
          },
          (res) => {
            res.node.left = res.left;
            res.node.top = res.top;
            console.log(res, JSON.stringify(res.node), 'res');
            this.scene = new Scene({
              id: id,
              // @ts-ignore
              canvas: res.node,
              map: map,
              hasBaseMap: true,
            });
          }
        )
        .exec();
  },
  didUnmount() {},
  onError() {},
  methods: {
    onCanvasReady() {
      //@ts-ignore
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
    regionchange() {
      console.log('region change');
    },
  },
});
