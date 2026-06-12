import { Module } from '@nestjs/common';
import { AUDIT_REPOSITORY, AUDIT_SERVICE } from './audit.constants';
import { AuditRepository } from './repository/audit.repository';
import { AuditService } from './services/audit.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuditLogEntity } from './models/audit.entity';
import { AuditListener } from './listeners/audit.listener';

@Module({
  imports: [TypeOrmModule.forFeature([AuditLogEntity])],
  providers: [
    {
      provide: AUDIT_REPOSITORY,
      useClass: AuditRepository,
    },
    {
      provide: AUDIT_SERVICE,
      useClass: AuditService,
    },
    AuditListener,
  ],
  exports: [AUDIT_REPOSITORY, AUDIT_SERVICE],
})
export class AuditModule {}
