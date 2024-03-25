import { NestExpressApplication } from '@nestjs/platform-express';
import { AppLogger } from 'libs/core/src/app.logger';

export class AppDispatcher {
  private _app!: NestExpressApplication;
  private _logger = new AppLogger('APP');

  async dispatch() {
    await this._startServer();
  }

  async shutdown() {
    if (!this._app) {
      return;
    }

    await this._app.close();
  }

  private async _startServer() {
    this._logger.log(
      `Server is listening at port ${process.env.APP_PORT || 3000}`,
    );
  }
}
