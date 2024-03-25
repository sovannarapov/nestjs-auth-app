import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppLogger } from 'libs/core/src/app.logger';
import { AppDispatcher } from './app.dispatcher';
// import exitHook from 'async-exit-hook';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  await app.listen(process.env.APP_PORT || 3000);

  const logger = new AppLogger('Index');

  logger.log('Start');

  const dispatcher = new AppDispatcher();

  dispatcher
    .dispatch()
    .then(() => logger.log('Everything up'))
    .catch((error: Error) => {
      logger.error(error.message, error.stack);
      process.on('SIGINT', () => {
        process.exit(1);
      });
    });

  // exitHook((callback: () => void) => {
  //   void dispatcher.shutdown().then(() => {
  //     logger.log('Graceful shutdown the server');
  //     callback();
  //   });
  // });
}

bootstrap();
