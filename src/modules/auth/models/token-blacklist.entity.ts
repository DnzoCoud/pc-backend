import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({
  name: 'token_blacklist',
})
export class TokenBlacklistEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Index('IDX_TOKEN_BLACKLIST_JTI', {
    unique: true,
  })
  @Column({
    name: 'jti',
    type: 'varchar',
    length: 100,
  })
  jti!: string;

  @Column({
    name: 'user_id',
    type: 'uuid',
  })
  userId!: string;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp with time zone',
  })
  createdAt!: Date;
}
