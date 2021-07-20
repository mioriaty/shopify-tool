import axios from 'axios';
import Router from 'koa-router';

const exampleRouter = new Router({
  prefix: '/example',
});

exampleRouter.get('/', async ctx => {
  try {
    const res = await axios.get('https://wilcityapp.com/wp-json/wiloke/v3/general-settings');
    ctx.body = {
      status: 'success',
      data: res.data,
    };
  } catch (err) {
    console.log(err);
  }
});

export default exampleRouter;
