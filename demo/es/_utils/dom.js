import { ctx } from './ctx';
export var SelectorQuery = {
  node: function node(selector) {
    return new Promise(function (resolve, reject) {
      console.log(ctx, selector, 'ctx');
      ctx.createSelectorQuery().select(selector).node(function (res) {
        console.log(res, 'res');
        return resolve(res.node);
      }).exec();
    });
  }
};