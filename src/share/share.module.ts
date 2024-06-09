import { Module } from '@nestjs/common';
import { SharedInfrastructureModule } from './infrastructure/event-store/shared-infrastructrure.module';

@Module({
  imports: [SharedInfrastructureModule],
  exports: [SharedInfrastructureModule],
})
export class ShareModule {}
