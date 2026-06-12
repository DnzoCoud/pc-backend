import { Inject, Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { AuditEvent } from '../events/audit.event';
import { AuditLogEntity } from '../models/audit.entity';
import { AUDIT_REPOSITORY } from '../audit.constants';
import { type IAuditRepository } from '../repository/audit.repository.interface';

@Injectable()
export class AuditListener {
  private readonly logger = new Logger(AuditListener.name);

  constructor(
    @Inject(AUDIT_REPOSITORY)
    private readonly repository: IAuditRepository,
  ) {}

  @OnEvent('audit.created', {
    async: true,
  })
  async handleAuditEvent(event: AuditEvent): Promise<void> {
    try {
      const log = new AuditLogEntity();

      log.userId = event.userId ?? null;
      log.action = event.action;
      log.resource = event.resource;
      log.metadata = event.metadata ?? null;

      await this.repository.save(log);
    } catch (error) {
      this.logger.error('Audit log failed', error);
    }
  }
}
