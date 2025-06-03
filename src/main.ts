import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import {TransformInterceptor} from './common/interceptors/transform.interceptor';
import {HttpExceptionFilter} from './common/filters/http-exception.filter';

async function bootstrap() {
  // 创建NestJS应用实例
  const app = await NestFactory.create(AppModule);
  
  // 启用全局验证管道
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true
  }));
  
  // 启用全局响应转换拦截器
  app.useGlobalInterceptors(new TransformInterceptor());
  
  // 启用全局异常过滤器
  app.useGlobalFilters(new HttpExceptionFilter());
  
  // 允许跨域请求
  app.enableCors();
  
  // 设置全局前缀
  app.setGlobalPrefix('api');
  
  // 创建Swagger文档
  const config = new DocumentBuilder()
    .setTitle('代码片段管理系统')
    .setDescription('代码片段管理系统API文档')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
    
  const document = SwaggerModule.createDocument(app, config);
  
  SwaggerModule.setup('api/docs', app, document);
  
  // 启动应用
  await app.listen(process.env.PORT || 60888);
  console.log(`应用已启动: http://localhost:${process.env.PORT}/api/docs`);
}

bootstrap();
