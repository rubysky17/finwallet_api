import { ConfigType, registerAs } from "@nestjs/config";
import { env, envBoolean, envNumber } from "src/global/env";

export const appRegToken = 'app'

const globalPrefix = env('GLOBAL_PREFIX', 'api')

export const AppConfig = registerAs(appRegToken, (() => ({
    name: env("APP_NAME"),
    port: envNumber("APP_PORT", 7001),
    baseUrl: env("APP_BASE_URL"),
    multiDeviceLogin: envBoolean("APP_MULTI_DEVICE_LOGIN", false),
    globalPrefix,
    logger: {
        level: env('LOGGER_LEVEL'),
        maxFiles: envNumber('LOGGER_MAX_FILES'),
    },
})));

export type IAppConfig = ConfigType<typeof AppConfig>