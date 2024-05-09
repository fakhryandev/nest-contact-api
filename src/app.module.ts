import { Module } from '@nestjs/common';
import { CommonModule } from './common/common.module';
import { PrismaService } from './common/prisma.service';

@Module({
  imports: [CommonModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
