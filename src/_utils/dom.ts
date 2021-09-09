import { ctx } from './ctx';

export const SelectorQuery = {
  node(selector: string) {
    return new Promise((resolve, reject) => {
      console.log(ctx, selector, 'ctx');
      ctx
        .createSelectorQuery()
        .select(selector)
        .node((res) => {
          console.log(res, 'res');
          return resolve(res.node);
        })
        .exec();
    });
  },
};
