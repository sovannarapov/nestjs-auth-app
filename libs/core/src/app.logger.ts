import type { LoggerService } from '@nestjs/common';
import type { Logger } from 'winston';
import { addColors, createLogger, format, transports } from 'winston';

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

const level = () => {
  const env = process.env.NODE_ENV || 'development';
  const isDevelopment = env === 'development';

  return isDevelopment ? 'debug' : 'warn';
};

const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'white',
};

addColors(colors);

const formatter = (context?: string, label?: string) =>
  format.combine(
    format.label({ label, message: false }),
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
    format.colorize({ all: true }),
    format.printf(
      (info) =>
        `[${context ? context : 'APP'}] - ${info.timestamp} ${info.level}: ${
          info.message
        }`,
    ),
    // winston.format.json(),
  );

const transporters = [
  new transports.File({
    filename: 'storage/logs/error.log',
    level: 'error',
  }),
  new transports.File({
    level: 'info',
    filename: 'storage/logs/all.log',
    handleExceptions: false,
    maxsize: 5_242_880, // 5MB
    maxFiles: 5,
  }),
  new transports.Console({
    level: 'debug',
    handleExceptions: false,
  }),
];

export class AppLogger implements LoggerService {
  public context?: string;

  private _logger: Logger;

  constructor(label?: string) {
    this._logger = createLogger({
      levels,
      level: level(),
      transports: transporters,
      format: formatter(label),
    });
  }

  public setContext(context: string) {
    this.context = context;
  }

  error(message: string, ...meta: unknown[]) {
    this._logger.error(message, meta);
  }

  warn(message: string, ...meta: unknown[]) {
    this._logger.warn(message, meta);
  }

  log(message: string, ...meta: unknown[]) {
    this._logger.info(message, meta);
  }

  verbose(message: string, ...meta: unknown[]) {
    this._logger.verbose(message, meta);
  }

  debug(message: string, ...meta: unknown[]) {
    this._logger.debug(message, meta);
  }

  silly(message: string, ...meta: unknown[]) {
    this._logger.silly(message, meta);
  }

  http(message: string, ...meta: unknown[]) {
    this._logger.http(message, meta);
  }

  clear() {
    this._logger.clear();
  }
}
