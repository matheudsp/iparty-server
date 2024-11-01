import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
	const app = await NestFactory.create(AppModule)

	app.enableCors()

	const config = new DocumentBuilder()
		.setTitle('iParty API/REST')
		.setDescription('API REST para o sistema iParty!')
		.setVersion('1.0')
		.addTag('auth')
		.addTag('participant')
		.addTag('party')
		.addTag('payment')
		.addTag('user')
		.addBearerAuth(
			{
				type: 'http',
				scheme: 'bearer',
				bearerFormat: 'JWT',
				in: 'header',
			},
			'access-token',
		)
		.build();

	const document = SwaggerModule.createDocument(app, config);

	SwaggerModule.setup('', app, document)

	await app.listen(3333)
}
bootstrap()