export class AuditEvent {
  userId?: string;

  action!: string;

  resource!: string;

  metadata?: Record<string, unknown>;
}
