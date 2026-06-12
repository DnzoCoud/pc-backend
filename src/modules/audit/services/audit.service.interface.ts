import { AuditEvent } from '../events/audit.event';

export interface IAuditService {
  publish(event: AuditEvent): void;
}
