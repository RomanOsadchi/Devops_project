import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersModule } from "./users/users.module";
import { HealthcheckModule } from "./healthcheck/healthcheck.module";
import { ConfigModule } from "@nestjs/config";
import { AppController } from "./app.controller";
import * as process from "node:process";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: "mysql",
      host: process.env.DB_HOST || "127.0.0.1",
      port: Number(process.env.DB_PORT) || 3306,
      username: process.env.DB_USERNAME || "root",
      password: process.env.DB_ROOT_PASSWORD || "root",
      database: process.env.DB_DATABASE || "root",
      autoLoadEntities: true,
      synchronize: true,
    }),
    UsersModule,
    HealthcheckModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
