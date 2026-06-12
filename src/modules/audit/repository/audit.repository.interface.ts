import { AuditLogEntity } from '../models/audit.entity';

export interface IAuditRepository {
  save(audit: AuditLogEntity): Promise<AuditLogEntity>;
}
