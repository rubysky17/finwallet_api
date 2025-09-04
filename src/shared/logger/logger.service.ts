import { Inject, Injectable, LoggerService as NestLoggerService } from '@nestjs/common';
import { Logger } from 'winston';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';

// ! Configs
import { ConfigService } from '@nestjs/config';
import { ConfigKeyPaths } from '~/config';

export enum LogLevel {
    ERROR = 'error',
    WARN = 'warn',
    INFO = 'info',
    DEBUG = 'debug',
    VERBOSE = 'verbose',
}

@Injectable()
export class LoggerService implements NestLoggerService {
    constructor(
        @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
        private configService: ConfigService<ConfigKeyPaths>
    ) { }

    protected get level(): LogLevel {
        return this.configService.get('app.logger.level', { infer: true }) as LogLevel
    }

    protected get maxFiles(): number {
        return this.configService.get('app.logger.maxFiles', { infer: true })
    }

    log(message: string, context?: string) {
        this.logger.info(message, { context });
    }

    error(message: string, trace?: string, context?: string) {
        this.logger.error(message, { trace, context });
    }

    warn(message: string, context?: string) {
        this.logger.warn(message, { context });
    }

    debug(message: string, context?: string) {
        this.logger.debug(message, { context });
    }

    verbose(message: string, context?: string) {
        this.logger.verbose(message, { context });
    }
}
