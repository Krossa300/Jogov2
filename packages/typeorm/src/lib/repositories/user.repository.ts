import { FindOptionsWhere } from 'typeorm';
import { BaseRepository } from './base.repository';
import { User } from '../entities/user.entity';

/**
 * Repositório para a entidade User
 * Estende BaseRepository com métodos específicos para User
 */
export class UserRepository extends BaseRepository<User> {
  constructor() {
    super(User);
  }

  /**
   * Encontra um usuário por email
   */
  async findByEmail(email: string): Promise<User | null> {
    return this.findOneBy({ email } as FindOptionsWhere<User>);
  }

  /**
   * Encontra usuários ativos
   */
  async findActiveUsers(): Promise<User[]> {
    return this.findBy({ isActive: true } as FindOptionsWhere<User>);
  }

  /**
   * Encontra usuários por role
   */
  async findByRole(role: string): Promise<User[]> {
    return this.findBy({ role } as FindOptionsWhere<User>);
  }

  /**
   * Conta usuários ativos
   */
  async countActiveUsers(): Promise<number> {
    return this.count({ isActive: true } as FindOptionsWhere<User>);
  }

  /**
   * Verifica se um email já está em uso
   */
  async emailExists(email: string): Promise<boolean> {
    return this.exists({ email } as FindOptionsWhere<User>);
  }

  /**
   * Desativa um usuário (soft delete lógico)
   */
  async deactivateUser(id: string): Promise<User | null> {
    return this.update(id, { isActive: false });
  }

  /**
   * Ativa um usuário
   */
  async activateUser(id: string): Promise<User | null> {
    return this.update(id, { isActive: true });
  }

  /**
   * Busca usuários por nome (busca parcial)
   */
  async searchByName(name: string): Promise<User[]> {
    return this.getRepository()
      .createQueryBuilder('user')
      .where('user.name ILIKE :name', { name: `%${name}%` })
      .getMany();
  }
}