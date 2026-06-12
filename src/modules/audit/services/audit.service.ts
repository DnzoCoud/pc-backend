import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { AuditEvent } from '../events/audit.event';
import { IAuditService } from './audit.service.interface';

@Injectable()
export class AuditService implements IAuditService {
  constructor(private readonly eventEmitter: EventEmitter2) {}

  publish(event: AuditEvent): void {
    setImmediate(() => {
      this.eventEmitter.emit('audit.created', event);
    });
  }
}
