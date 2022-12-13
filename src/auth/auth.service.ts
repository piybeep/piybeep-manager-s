import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AccountsService } from '../accounts/accounts.service';
import { LoginAccountInput } from './dto/login-account.input';
import { Auth } from './entities/auth.entity';
import { Repository } from 'typeorm';
import { Account } from '../accounts/entities/account.entity';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

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

		if (!account) return new Error('Неверный логин или пароль');

		const auth = await this.authRepository.findOneBy({
			accountId: account.id,
		});

		// console.log(await this.authRepository.find(), account.id);

		if (!auth) return new Error('Auth not found');
		if (!(await bcrypt.compare(password, auth.token))) return new Error('Неверный логин или пароль');

		return this.login(account);
	}

	async login(account: Account) {
		const role = await this.accountService.getRole(account.roleId);
		return {
			access_token: this.jwtService.sign({
				sub: account.id,
				username: account.username,
				role: {
					name: role.name,
					level: role.level,
				},
			}),
			account,
		};
	}

	async singup(username: string, password: string) {
		const account = await this.accountService.create({ username });
		const token = await bcrypt.hash(password, 10);
		await this.authRepository.save({
			accountId: account.id,
			token,
		});
		// console.log(auth);

		const role = await this.accountService.getRole(account.roleId);
		return {
			access_token: this.jwtService.sign({
				sub: account.id,
				username: account.username,
				role: {
					name: role.name,
					level: role.level,
				},
			}),
			account,
		};
	}
}



