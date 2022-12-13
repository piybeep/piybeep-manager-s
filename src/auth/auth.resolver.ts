import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginResponse } from './dto/login-response';
import { LoginAccountInput } from './dto/login-account.input';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './jwt-auth.guard';
import { Auth } from './entities/auth.entity';

@Resolver(() => Auth)
export class AuthResolver {
	constructor(private readonly authService: AuthService) {}

	@Mutation((returns) => LoginResponse)
	async login(
		@Args('loginAccountInput') loginAccountInput: LoginAccountInput,
	) {
		const answer = await this.authService.validateAccount(
			loginAccountInput.username,
			loginAccountInput.password,
		);
		console.log(answer);

		return answer;
	}

	@Mutation((returns) => LoginResponse)
	singup(
		@Args('username') username: string,
		@Args('password') password: string,
	) {
		return this.authService.singup(username, password);
	}
}

