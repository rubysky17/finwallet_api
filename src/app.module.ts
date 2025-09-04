import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import config from './config';
import { ClsModule } from 'nestjs-cls';

// ! Shared Modules
import { SharedModule } from './shared/shared.module';
import { DatabaseModule } from './shared/database/database.module';

// ! Other Modules
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { HealthModule } from './modules/health/health.module';
import { WalletModule } from './modules/wallets/wallet.module';
import { CategoryModule } from './modules/categories/category.module';
import { CategoryTemplateModule } from './modules/categoryTemplate/category-template.module';
import { UserWalletModule } from './modules/userWallet/userWallet.module';


// ! Middlewares
import { LoggerMiddleware } from './common/middleware/logger.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
      envFilePath: [`.env.${process.env.NODE_ENV}`, '.env'],
      cache: true,
      load: [...Object.values(config)],
    }),
    ClsModule.forRoot({
      global: true,
      interceptor: {
        mount: true,
        // setup: (cls, context) => {
        //   const req = context.switchToHttp().getRequest<FastifyRequest<{ Params: { id?: string } }>>()
        //   if (req.params?.id && req.body) {
        //     cls.set('operateId', Number.parseInt(req.params.id))
        //   }
        // },
      },
    }),
    HealthModule,
    SharedModule,
    DatabaseModule,
    AuthModule,
    UsersModule,
    CategoryModule,
    CategoryTemplateModule,
    WalletModule,
    UserWalletModule,
  ]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
