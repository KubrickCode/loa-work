import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import "./enums";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      skipNullProperties: true, // null 값 검증 스킵
      skipUndefinedProperties: true, // undefined 값 검증 스킵 (GraphQL optional 필드)
      transform: true, // DTO 클래스 인스턴스로 변환 (중첩 객체 검증에 필요)
      transformOptions: {
        enableImplicitConversion: true, // GraphQL 스칼라 타입 자동 변환 허용
      },
      whitelist: false, // 선언되지 않은 속성 제거 안 함 (GraphQL과 충돌 방지)
    })
  );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
