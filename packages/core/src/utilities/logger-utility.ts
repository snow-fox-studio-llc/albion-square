import { createLogger, transports, format } from "winston";

export class LoggerUtility {
	private logger;

	constructor(label: string) {
		this.logger = createLogger({
			transports: [
				new transports.Console({
					format: format.combine(
						format.colorize(),
						format.timestamp(),
						format.label({ label }),
						format.printf(
							({ level, message, label, timestamp }) =>
								`${timestamp} [${label}] ${level}: ${message.substring(
									0,
									Math.min(64, message.length)
								)}`
						)
					),
				}),
			],
		});
	}

	error(msg: string) {
		this.logger.error(msg);
	}

	warn(msg: string) {
		this.logger.warn(msg);
	}

	info(msg: string) {
		this.logger.info(msg);
	}

	http(msg: string) {
		this.logger.http(msg);
	}

	verbose(msg: string) {
		this.logger.verbose(msg);
	}

	debug(msg: string) {
		this.logger.debug(msg);
	}

	silly(msg: string) {
		this.logger.silly(msg);
	}
}
