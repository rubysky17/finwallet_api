import { AppConfig, appRegToken, IAppConfig } from "./app.config"
import { DatabaseConfig, dbRegToken, IDatabaseConfig } from "./database.config"
import { ISwaggerConfig, SwaggerConfig, swaggerRegToken } from "./swagger.config"

export * from './app.config'
export * from './database.config'

export interface AllConfigType {
    [appRegToken]: IAppConfig
    [dbRegToken]: IDatabaseConfig
    [swaggerRegToken]: ISwaggerConfig
}

export type ConfigKeyPaths = RecordNamePaths<AllConfigType>

export default {
    AppConfig,
    DatabaseConfig,
    SwaggerConfig,
}