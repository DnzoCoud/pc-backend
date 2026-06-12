import { Injectable } from '@nestjs/common';
import { IAuditRepository } from './audit.repository.interface';
import { AuditLogEntity } from '../models/audit.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AuditRepository implements IAuditRepository {
  constructor(
    @InjectRepository(AuditLogEntity)
    private readonly repository: Repository<AuditLogEntity>,
  ) {}

  save(audit: AuditLogEntity): Promise<AuditLogEntity> {
    return this.repository.save(audit);
  }
}
