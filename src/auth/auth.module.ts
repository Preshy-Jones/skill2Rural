import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { UserModule } from "src/user/user.module";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { LocalStrategy } from "src/common/strategy/local.strategy";
import { JwtStrategy } from "src/common/strategy/jwt.strategy";
import { UserService } from "src/user/user.service";
import { PrismaService } from "src/prisma.service";
import { UserRepository } from "src/user/repositories/user.repository";
import { MailModule } from "src/mail/mail.module";
import { MailService } from "src/mail/mail.service";
import { AccountRecoveryRepository } from "src/user/repositories/accountRecovery.repository";

@Module({
  imports: [
    UserModule,
    PassportModule,
    MailModule,
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>("JWT_SECRET"),
        signOptions: { expiresIn: "2400s" },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    UserService,
    PrismaService,
    UserRepository,
    AccountRecoveryRepository,
    MailService,
  ],
  exports: [AuthService],
})
export class AuthModule {}
