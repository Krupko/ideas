// import cors from 'cors';
// import express from 'express';
// import { trpcRouter } from './router/router';
// import { applyTrpcToExpressApp } from './Lib/trpc';
// import { AppContext, createAppContext } from './Lib/ctx';
//
// void (async () => {
//   let ctx: AppContext | null = null;
//   try {
//     ctx = createAppContext();
//     const expressApp = express();
//
//     expressApp.use(cors());
//     expressApp.get('/ping', (req, res) => {
//       res.send('pong');
//     });
//
//     applyTrpcToExpressApp(expressApp, ctx, trpcRouter);
//
//     expressApp.listen(3000, () => {
//       console.info('Listening at http://localhost:3000');
//     });
//   } catch (error) {
//     console.error(error);
//     await ctx?.stop();
//   }
// });
//
//
//
import cors from 'cors';
import express from 'express';
import { trpcRouter } from './router/router';
import { applyTrpcToExpressApp } from './Lib/trpc';
import { AppContext, createAppContext } from './Lib/ctx';

void (async () => {
  let ctx: AppContext | null = null;
  try {
    console.log('1. Создаю контекст...');
    ctx = createAppContext();
    console.log('2. Контекст создан');

    const expressApp = express();
    console.log('3. Express app создан');

    expressApp.use(cors());
    expressApp.get('/ping', (req, res) => {
      res.send('pong');
    });
    console.log('4. Маршруты добавлены');

    console.log('5. Применяю tRPC...');
    applyTrpcToExpressApp(expressApp, ctx, trpcRouter);
    console.log('6. tRPC применён');

    expressApp.listen(3000, () => {
      console.info('Listening at http://localhost:3000');
    });
    console.log('7. Server listener установлен');
  } catch (error) {
    console.error('❌ Ошибка при запуске:', error);
    await ctx?.stop();
  }
});
