import { AppConfig, appRegToken, IAppConfig } from "./app.config"
import { DatabaseConfig, dbRegToken, IDatabaseConfig } from "./database.config"

export * from './app.config'
export * from './database.config'

export interface AllConfigType {
    [appRegToken]: IAppConfig
    [dbRegToken]: IDatabaseConfig
}

export type ConfigKeyPaths = RecordNamePaths<AllConfigType>

export default {
    AppConfig,
    DatabaseConfig,
}