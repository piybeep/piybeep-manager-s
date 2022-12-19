import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';

import { AccountsModule } from '../accounts/accounts.module';
import { Auth } from './entities/auth.entity';
import { Session } from './entities/session.entity';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
	imports: [
		TypeOrmModule.forFeature([Auth, Session]),
		AccountsModule,
		PassportModule,
		JwtModule.register({
			secret: process.env.JWT_SECRET,
			signOptions: { expiresIn: '30m' },
		}),
	],
	providers: [AuthResolver, AuthService, LocalStrategy, JwtStrategy],
	exports: [AuthService],
})
export class AuthModule {}


