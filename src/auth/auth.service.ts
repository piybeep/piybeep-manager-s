import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AccountsService } from '../accounts/accounts.service';
import { LoginAccountInput } from './dto/login-account.input';
import { Auth } from './entities/auth.entity';
import { Repository } from 'typeorm';
import { Account } from '../accounts/entities/account.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
	constructor(
		@InjectRepository(Auth)
		private readonly authRepository: Repository<Auth>,
		private readonly accountService: AccountsService,
		private readonly jwtService: JwtService,
	) {}

	async validateAccount(username: string, password: string) {
		const [account] = await this.accountService.findAll({
			where: { username },
		});

		if (!account) return null;

		const auth = await this.authRepository.findOneBy({
			accountId: account.id,
		});
		if (auth.token != password) return null;

		return account;
	}

	async login(account: Account) {
		return {
			access_token: this.jwtService.sign({
				sub: account.id,
				username: account.username,
				role: {
					name: account.role.name,
					level: account.role.level,
				},
			}),
			account,
		};
	}
}

