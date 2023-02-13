import * as winston from "winston";

const logger = winston.createLogger({
  transports: [
    new winston.transports.File({
      level: "error",
      filename: "src/logs/information.log",
    }),
    new winston.transports.File({
      level: "info",
      filename: "src/logs/information.log",
    }),
    new winston.transports.File({
      level: "warning",
      filename: "src/logs/information.log",
    }),
    new winston.transports.File({
      level: "debug",
      filename: "src/logs/information.log",
    }),
  ],
  format: winston.format.combine(
    winston.format.label({
      label: `Label🏷️`,
    }),
    winston.format.timestamp({
      format: "MMM-DD-YYYY HH:mm:ss",
    }),
    winston.format.printf(
      (info) =>
        `${info.level}: ${info.label}: ${[info.timestamp]}: ${info.message}`
    )
  ),
});

export default logger;
