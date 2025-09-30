import { Entity, Column } from 'typeorm';
import { BaseEntity } from './base.entity.js';
import { IAtributoBase } from '@jogov2/shared-interfaces';

/**
 * Entidade Atributo
 */
@Entity('atributo')
export class Atributo extends BaseEntity implements IAtributoBase {
  @Column({
    type: 'varchar',
    length: 100,
    nullable: false,
  })
  nome!: string;
}