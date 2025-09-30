import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  DeleteDateColumn,
  Column,
} from 'typeorm';

import { IIdentificavel } from '@jogov2/shared-interfaces';

/**
 * Classe base para todas as entidades
 * Contém campos comuns como ID, timestamps de criação, atualização e exclusão
 */
export abstract class BaseEntity implements IIdentificavel {
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  codigo?: string;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    name: 'created_at',
  })
  createdAt!: Date;

  @DeleteDateColumn({
    type: 'timestamp',
    nullable: true,
    name: 'deleted_at',
  })
  deletedAt?: Date;
}