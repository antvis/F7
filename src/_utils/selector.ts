import { ctx } from './ctx';

class Selector {
  _selector: any;
  constructor() {
    this._selector = ctx.createSelectorQuery();
  }

  node(selector: string) {
    return new Promise((resolve, reject) => {
      return this._selector
        .select(selector)
        .node((res) => resolve(res.node))
        .exec();
    });
  }

  fields(selector: string) {
    return new Promise((resolve, reject) => {
      this._selector
        .select(selector)
        .fields(
          {
            node: true,
            context: false,
            rect: true,
            computedStyle: ['height', 'width'],
          },
          function (res) {
            res.node.left = res.left;
            res.node.top = res.top;
            resolve(res.node);
          }
        )
        .exec();
    });
  }
  element(selector: string) {
    return new Promise((resolve, reject) => {
      this._selector.select(`#${selector}`)
      .fields(
        {
          node: true,
          context: false,
          rect: true,
          computedStyle: ['height', 'width'],
        },
        function(res) {
          res.node.left = res.left
          res.node.top = res.top
          resolve(res.node)
        })
      .exec();  
    })
    
  }
}

export default new Selector();
