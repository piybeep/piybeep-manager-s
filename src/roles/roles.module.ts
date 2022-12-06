import { Module, forwardRef } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesResolver } from './roles.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { AccountsModule } from '../accounts/accounts.module';

@Module({
	imports: [
		TypeOrmModule.forFeature([Role]),
		forwardRef(() => AccountsModule),
	],
	providers: [RolesResolver, RolesService],
	exports: [RolesService],
})
export class RolesModule {}

