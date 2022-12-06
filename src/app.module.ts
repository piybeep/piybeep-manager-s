import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountsModule } from './accounts/accounts.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ThrottlerModule } from '@nestjs/throttler';
import { RolesModule } from './roles/roles.module';
import { ServersModule } from './servers/servers.module';
import { ProjectsModule } from './projects/projects.module';

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
		ThrottlerModule.forRoot({
			ttl: 60,
			limit: 10,
		}),
		GraphQLModule.forRoot<ApolloDriverConfig>({
			driver: ApolloDriver,
			autoSchemaFile: 'schema.gql',
			sortSchema: true,
			playground: true,
			cors: {
				origin: 'http://localhost:3000',
				credentials: true,
			},
		}),
		TypeOrmModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			useFactory: async (config: ConfigService) => ({
				type: config.get<'aurora-data-api'>('TYPEORM_CONNECTION'),
				host: config.get<string>('TYPEORM_HOST'),
				username: config.get<string>('TYPEORM_USER'),
				password: config.get<string>('TYPEORM_PASSWORD'),
				database: config.get<string>('TYPEORM_DB'),
				port: config.get<number>('TYPEORM_PORT'),
				entities: [__dirname + 'dist/**/*.entity.{t,j}s'],
				synchronize: true,
				autoLoadEntities: true,
				logging: true,
			}),
		}),
		AccountsModule,
		RolesModule,
		ServersModule,
		ProjectsModule,
	],
	providers: [],
})
export class AppModule {}
