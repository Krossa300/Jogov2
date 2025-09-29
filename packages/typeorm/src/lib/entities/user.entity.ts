import { Entity, Column, Index } from 'typeorm';
import { BaseEntity } from './base.entity';
import { IsEmail, IsNotEmpty, Length } from 'class-validator';

/**
 * Entidade User - exemplo de como criar uma entidade
 */
@Entity('users')
@Index(['email'], { unique: true })
export class User extends BaseEntity {
  @Column({
    type: 'varchar',
    length: 100,
    nullable: false,
  })
  @IsNotEmpty({ message: 'Nome é obrigatório' })
  @Length(2, 100, { message: 'Nome deve ter entre 2 e 100 caracteres' })
  name!: string;

  @Column({
    type: 'varchar',
    length: 255,
    unique: true,
    nullable: false,
  })
  @IsEmail({}, { message: 'Email deve ser válido' })
  email!: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  password?: string;

  @Column({
    type: 'boolean',
    default: true,
    name: 'is_active',
  })
  isActive!: boolean;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
  })
  role!: string;
}