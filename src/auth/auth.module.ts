import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AccountsModule } from '../accounts/accounts.module';

import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { jwtConstants } from './constants';
import { JwtStrategy } from './jwt.strategy';
import { Auth } from './entities/auth.entity';
import { JwtAuthGuard } from './jwt-auth.guard';

@Module({
	imports: [
		TypeOrmModule.forFeature([Auth]),
		AccountsModule,
		PassportModule,
		JwtModule.register({
			secret: jwtConstants.secret,
			signOptions: { expiresIn: '60s' },
		}),
	],
	providers: [AuthService, AuthResolver, JwtAuthGuard,JwtStrategy],
})
export class AuthModule {}


