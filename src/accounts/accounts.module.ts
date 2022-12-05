import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountEntity } from './entities/account.entity';
import { AccountsService } from './accounts.service';
import { AccountsResolver } from './accounts.resolver';
import { RolesModule } from '../roles/roles.module';

@Module({
	imports: [TypeOrmModule.forFeature([AccountEntity]), RolesModule],
	providers: [AccountsService, AccountsResolver],
	exports: [TypeOrmModule],
})
export class AccountsModule {}
