import dotenv from 'dotenv';
import { ConfigType, registerAs } from "@nestjs/config";
import { env, envBoolean } from "~/global/env";

export const swaggerRegToken = 'swagger'

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

const dataSourceOptions = {
    enable: envBoolean('SWAGGER_ENABLE'),
    path: env('SWAGGER_PATH'),
    serverUrl: `${env('SWAGGER_SERVER_URL', env('APP_BASE_URL'))}`,
    version: env('SWAGGER_VERSION', '1.0'),
}

export const SwaggerConfig = registerAs(
    swaggerRegToken,
    () => dataSourceOptions,
)

export type ISwaggerConfig = ConfigType<typeof SwaggerConfig>