import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from './entities/account.entity';
import { AccountsService } from './accounts.service';
import { AccountsResolver } from './accounts.resolver';
import { RolesModule } from '../roles/roles.module';

@Module({
	imports: [
		TypeOrmModule.forFeature([Account]),
		forwardRef(() => RolesModule),
	],
	providers: [AccountsService, AccountsResolver],
	exports: [AccountsService],
})
export class AccountsModule {}

