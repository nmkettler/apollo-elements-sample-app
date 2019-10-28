/* eslint-disable no-console */
const Logger = {};
const defaultLogger = {
  info: console.log,
  error: console.error,
  warn: console.warn
};

const logger = defaultLogger;

Logger.setLogger = ({
  info = defaultLogger.info,
  error = defaultLogger.error,
  warn = defaultLogger.warn
} = {}) => {
  logger.info = info;
  logger.warn = warn;
  logger.error = error;
};

Logger.info = (...args) => {
  logger.info('INFO: ', ...args);
};

Logger.error = (...args) => {
  logger.error('ERROR: ', ...args);
};

Logger.warn = (...args) => {
  logger.warn('WARNING: ', ...args);
};

module.exports = Logger;
