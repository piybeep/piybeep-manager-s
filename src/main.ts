import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	const config = app.get(ConfigService);
	const PORT = config.get<number>('API_PORT');
	app.use(cookieParser());
	app.enableCors({
		origin: true, // 'http://localhost:3000',
		credentials: true,
	});
	await app.listen(PORT || 5000);
}

bootstrap();


