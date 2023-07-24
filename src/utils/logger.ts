import { format, createLogger, transports } from "winston";
import DailyRotateFile from "winston-daily-rotate-file";

const { combine, timestamp, label, prettyPrint } = format;
const CATEGORY = "EmpMngSys";

let loggerTransports = [
  new transports.Console(),
  new DailyRotateFile({
    level: "error",
    filename: "logs/error-%DATE%.log",
    datePattern: "YYYY-MM-DD",
    zippedArchive: true,
    maxSize: "20m",
    maxFiles: "14d",
  }),
  new DailyRotateFile({
    level: "debug",
    filename: "logs/debug-%DATE%.log",
    datePattern: "YYYY-MM-DD",
    zippedArchive: true,
    maxSize: "20m",
    maxFiles: "14d",
  }),
];

const logger = createLogger({
  level: "debug",
  format: combine(
    label({ label: CATEGORY }),
    timestamp({
      format: "MMM-DD-YYYY HH:mm:ss",
    }),
    prettyPrint()
  ),
  transports: loggerTransports,
});

export default logger;
