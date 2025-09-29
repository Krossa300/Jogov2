import { Repository, EntityTarget, ObjectLiteral, FindOptionsWhere, DeepPartial } from 'typeorm';
import { getConnection } from '../config/database';

/**
 * Classe base para repositórios
 * Fornece métodos comuns para operações CRUD
 */
export abstract class BaseRepository<T extends ObjectLiteral> {
  protected repository: Repository<T>;

  constructor(entity: EntityTarget<T>) {
    const connection = getConnection();
    if (!connection) {
      throw new Error('Database connection not initialized');
    }
    this.repository = connection.getRepository(entity);
  }

  /**
   * Encontra todas as entidades
   */
  async findAll(): Promise<T[]> {
    return this.repository.find();
  }

  /**
   * Encontra uma entidade por ID
   */
  async findById(id: string): Promise<T | null> {
    return this.repository.findOne({ where: { id } as unknown as FindOptionsWhere<T> });
  }

  /**
   * Encontra entidades por critério
   */
  async findBy(criteria: FindOptionsWhere<T>): Promise<T[]> {
    return this.repository.find({ where: criteria });
  }

  /**
   * Encontra uma entidade por critério
   */
  async findOneBy(criteria: FindOptionsWhere<T>): Promise<T | null> {
    return this.repository.findOne({ where: criteria });
  }

  /**
   * Cria uma nova entidade
   */
  async create(data: DeepPartial<T>): Promise<T> {
    const entity = this.repository.create(data);
    return this.repository.save(entity);
  }

  /**
   * Atualiza uma entidade existente
   */
  async update(id: string, data: DeepPartial<T>): Promise<T | null> {
    await this.repository.update(id, data as any);
    return this.findById(id);
  }

  /**
   * Remove uma entidade
   */
  async delete(id: string): Promise<boolean> {
    const result = await this.repository.delete(id);
    return (result.affected ?? 0) > 0;
  }

  /**
   * Remove uma entidade usando soft delete
   */
  async softDelete(id: string): Promise<boolean> {
    const result = await this.repository.softDelete(id);
    return (result.affected ?? 0) > 0;
  }

  /**
   * Conta o número de entidades
   */
  async count(criteria?: FindOptionsWhere<T>): Promise<number> {
    return this.repository.count({ where: criteria });
  }

  /**
   * Verifica se uma entidade existe
   */
  async exists(criteria: FindOptionsWhere<T>): Promise<boolean> {
    const count = await this.repository.count({ where: criteria });
    return count > 0;
  }

  /**
   * Retorna o repositório TypeORM nativo para operações mais complexas
   */
  getRepository(): Repository<T> {
    return this.repository;
  }
}