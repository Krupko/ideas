import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import { trpcRouter } from './router/router';
import { applyTrpcToExpressApp } from './Lib/trpc';
import { createAppContext } from './Lib/ctx';
import { applyPassportToExpressApp } from './Lib/passport';

void (async () => {
  const ctx = createAppContext();

  try {
    const expressApp = express();

    expressApp.use(cors());
    expressApp.get('/ping', (req, res) => {
      res.send('pong');
    });

    applyPassportToExpressApp(expressApp, ctx);

    await applyTrpcToExpressApp(expressApp, ctx, trpcRouter);

    await new Promise<void>((resolve) => {
      expressApp.listen(3000, () => {
        console.info('Listening at http://localhost:3000');
        resolve();
      });
    });

    // Вечное ожидание, чтобы сервер не завершался
    await new Promise(() => {});
  } catch (error) {
    console.error('❌ Ошибка при запуске:', error);
    await ctx.stop();
  }
})();
