import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/dictionary?key=pippo')
      .expect(200)
      .expect({
        success: false,
        message: "DICTIONARY.NOT_FOUND"
      })
  });

  it('/ (GET) validation error', () => {
    return request(app.getHttpServer())
      .get('/dictionary')
      .expect(400)
  });
});
