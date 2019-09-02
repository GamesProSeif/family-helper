import { createLogger, format, transports } from 'winston';

export const logger = createLogger({
  format: format.combine(
    format.errors({ stack: true }),
    format.label({ label: 'SERVER' }),
    format.timestamp({ format: 'DD/MM/YYYY HH:mm:ss' }),
    format.printf((info: any) => {
      const { timestamp, label, level, message, ...rest } = info;
      return `[${timestamp}][${label}][${level.toUpperCase()}]: ${message}${
        Object.keys(rest).length ? `\n${JSON.stringify(rest, null, 2)}` : ''
      }`;
    })
  ),
  transports: [
    new transports.Console({
      format: format.colorize({ level: true }),
      level: 'info'
    })
  ]
});
