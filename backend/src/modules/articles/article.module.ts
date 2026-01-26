
import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../database/database.module';
import { ArticleService } from './article.service';
import { PublicArticleController } from './public-article.controller';
import { AdminArticleController } from './admin-article.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [PublicArticleController, AdminArticleController],
  providers: [ArticleService],
})
export class ArticleModule {}
