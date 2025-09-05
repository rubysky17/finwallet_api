
import { INestApplication, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { ConfigKeyPaths, IAppConfig } from './config';
import { ISwaggerConfig } from './config/swagger.config';

const setupSwagger = (app: INestApplication, configService: ConfigService<ConfigKeyPaths>) => {
    const { name } = configService.get<IAppConfig>('app')
    const { enable, path, serverUrl, version } = configService.get<ISwaggerConfig>('swagger')

    if (!enable) return;

    const swaggerPath = `${serverUrl}/${path}`

    const documentBuilder = new DocumentBuilder()
        .setTitle(name)
        .setDescription(`🔷 **Base URL**: \`${serverUrl}\` <br>🧾 **Swagger JSON**: (${swaggerPath}/json)<br>📌 [nest-api])
    `)
        .setVersion(version)
        .addServer(`${serverUrl}`, "Base Url");

    // ! Token implementation
    documentBuilder.addSecurity("auth", {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
    });

    const options = {
        ignoreGlobalPrefix: true,
    }

    const documentFactory = () => SwaggerModule.createDocument(
        app,
        documentBuilder.build(),
        options
    );

    SwaggerModule.setup(path, app, documentFactory,
        {
            swaggerOptions: {
                persistAuthorization: true,
            },
            jsonDocumentUrl: `/${path}/json`,
        }
    );

    return () => {
        const logger = new Logger('SwaggerModule')
        logger.log(`Swagger UI: ${swaggerPath}`)
        logger.log(`Swagger JSON: ${swaggerPath}/json`)
    }
}

export default setupSwagger;

