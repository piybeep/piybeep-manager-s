import { UseGuards, UnauthorizedException } from '@nestjs/common';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';

import { AuthService } from './auth.service';
import { LoginResponse } from './dto/login-response';
import { RefreshResponse } from './dto/refresh-response';
import { SignupResponse } from './dto/signup-response';
import { LoginInput } from './dto/login.input';
import { SignupInput } from './dto/signup.input';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AccountsService } from '../accounts/accounts.service';

@Resolver()
export class AuthResolver {
	constructor(
		private authService: AuthService,
		private accountsService: AccountsService,
	) {}

	@UseGuards(LocalAuthGuard)
	@Mutation((returns) => LoginResponse)
	async login(
		@Context() ctx: any,
		@Args('LoginInput') loginInput: LoginInput,
	) {
		const { refresh_token, ...answer } = await this.authService.login(
			ctx.user,
		);

		ctx.res.cookie('session', refresh_token);

		return answer;
	}

	@Mutation((returns) => SignupResponse)
	async signup(
		@Context() ctx: any,
		@Args('SignupInput') signupInput: SignupInput,
	) {
		const account = await this.authService.signup(signupInput);

		const { refresh_token, ...answer } = account;

		ctx.res.cookie('session', refresh_token);

		return answer;
	}

	@Mutation((returns) => RefreshResponse)
	async refresh(@Context() ctx: any) {
		const session = ctx.req?.cookies?.session;

		if (!session) throw new UnauthorizedException();

		const session_db = await this.authService.getSession(session);

		if (!session_db) throw new UnauthorizedException();

		await this.authService.removeSession(session_db.id);

		const date_ttl_seconds = +new Date(session_db.ttl * 1000),
			date_createdAt_seconds = +new Date(session_db.createdAt);

		if (Date.now() - (date_ttl_seconds + date_createdAt_seconds) > 0)
			throw new UnauthorizedException();

		const account = await this.accountsService.findOne(
			session_db.accountId,
		);
		if (!account)
			throw new Error('Аккаунт не найден. Возможно он был удален.');

		const { refresh_token, ...answer } = await this.authService.login(
			account,
		);

		ctx.res.cookie('session', refresh_token);

		return answer;
	}
}

