import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	const config = app.get(ConfigService);
	const PORT = config.get<number>('API_PORT');
	app.enableCors();
	await app.listen(PORT || 5000);
}

bootstrap();
