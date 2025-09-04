import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigService } from "@nestjs/config";
import { DataSource } from "typeorm";


import { EntityExistConstraint, UniqueConstraint } from "./constraints";
import { ConfigKeyPaths, IDatabaseConfig } from "~/config";

const providers = [EntityExistConstraint, UniqueConstraint];

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            inject: [ConfigService],
            dataSourceFactory: async (options) => {
                const dataSource = await new DataSource(options).initialize()
                return dataSource
            },
            useFactory: (configService: ConfigService<ConfigKeyPaths>) => {
                return {
                    ...configService.get<IDatabaseConfig>('database'),
                }
            }
        })
    ],
    providers,
    exports: providers
})
export class DatabaseModule { }