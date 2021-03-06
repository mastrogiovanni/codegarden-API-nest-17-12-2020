import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { LoggingInterceptor } from './common/interceptor/logging.interceptor';

// Redis cache
/*
import * as redis from "redis";
var bodyParser = require('body-parser');
const session = require('express-session')
let RedisStore = require('connect-redis')(session)
let redisClientSession = redis.createClient({
	host: process.env.REDIS_HOST
})
*/

// Rate limiting
import * as rateLimit from 'express-rate-limit';

// Validation
import { ValidationPipe } from '@nestjs/common';

import * as dotenv from 'dotenv';
dotenv.config()

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new LoggingInterceptor());
  
  app.useGlobalPipes(new ValidationPipe());
  
  /*
  app.use(
    bodyParser.json(),
		session({
			store: new RedisStore({ client: redisClientSession }),
			secret: 'incredible',
			resave: false,
			saveUninitialized: true,
			// cookie: { secure: true }
		})
  )
  */

  /*
  app.use(rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // limit each IP to 100 requests per windowMs
    message:
      "Too many requests from this IP, please try again later"
  }));
  */

  const loginLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour window
    max: 3, // start blocking after 3 requests
    message:
      "Too many accounts created from this IP, please try again after an hour"
  });
  app.use("/auth/login", loginLimiter);

  const options = new DocumentBuilder()
    .setTitle('Chuck Norris Facts by Stonize')
    .setDescription('The Facts API')
    .setVersion('0.0.1')
    // .addTag('Beautiful service')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
