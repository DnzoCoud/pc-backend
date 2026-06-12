import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('audit_logs')
export class AuditLogEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({
    name: 'user_id',
    type: 'uuid',
    nullable: true,
  })
  userId!: string | null;

  @Column({
    type: 'varchar',
    length: 100,
  })
  action!: string;

  @Column({
    type: 'varchar',
    length: 100,
  })
  resource!: string;

  @Column({
    type: 'jsonb',
    nullable: true,
  })
  metadata!: Record<string, unknown> | null;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp with time zone',
  })
  createdAt!: Date;
}
