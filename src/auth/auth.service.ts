import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

import { Auth } from './entities/auth.entity';
import { Session } from './entities/session.entity';
import { AccountsService } from '../accounts/accounts.service';
import { Account } from '../accounts/entities/account.entity';
import * as bcrypt from 'bcrypt';
import { SignupInput } from './dto/signup.input';

@Injectable()
export class AuthService {
	constructor(
		@InjectRepository(Auth)
		private readonly authRepos: Repository<Auth>,
		@InjectRepository(Session)
		private readonly sessionRepos: Repository<Session>,
		private readonly accountService: AccountsService,
		private readonly jwtService: JwtService,
	) {}

	async validateAccount(username: string, password: string) {
		const [account] = await this.accountService.findAll({
			where: { username },
		});

		if (!account) throw new Error('Неверный логин или пароль');

		const auth = await this.authRepos.findOneBy({
			accountId: account.id,
		});

		if (!auth) throw new Error('Auth not found');
		if (!(await bcrypt.compare(password, auth.token)))
			throw new Error('Неверный логин или пароль');

		return account;
	}

	async login(account: Account) {
		const role = await this.accountService.getRole(account.roleId);
		const session = await this.sessionRepos.save({ accountId: account.id });

		return {
			refresh_token: session.id,
			access_token: this.jwtService.sign({
				sub: account.id,
				username: account.username,
				role,
			}),
			account,
		};
	}

	async signup({ username, email, password }: SignupInput) {
		const account = await this.accountService.create({ username, email });

		const SALT = await bcrypt.genSalt();

		await this.authRepos.save({
			accountId: account.id,
			token: await bcrypt.hash(password, SALT),
		});
		return this.login(account);
	}

	getSession(token: string) {
		return this.sessionRepos.findOneBy({ id: token });
	}

	removeSession(token: string) {
		return this.sessionRepos.delete(token);
	}
}

