import { ConfigType, registerAs } from "@nestjs/config";
import { DataSource, DataSourceOptions } from "typeorm";
import { env, envBoolean, envNumber } from "~/global/env";
import dotenv from 'dotenv'

export const dbRegToken = 'database'
const currentScript = process.env.npm_lifecycle_event

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

const dataSourceOptions: DataSourceOptions = {
    type: 'mysql',
    host: env('DB_HOST', '127.0.0.1'),
    port: envNumber('DB_PORT', 13307),
    username: env('DB_USERNAME'),
    password: env('DB_PASSWORD'),
    database: env('DB_DATABASE'),
    synchronize: envBoolean('DB_SYNCHRONIZE', false),
    multipleStatements: currentScript === 'typeorm',
    entities: ['dist/modules/**/*.entity{.ts,.js}'],
    migrations: ['dist/migrations/*{.ts,.js}'],
    subscribers: ['dist/modules/**/*.subscriber{.ts,.js}'],
}

export const DatabaseConfig = registerAs(
    dbRegToken,
    (): DataSourceOptions => dataSourceOptions,
)

export type IDatabaseConfig = ConfigType<typeof DatabaseConfig>

const dataSource = new DataSource(dataSourceOptions)

export default dataSource