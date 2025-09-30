import { BaseRepository } from './base.repository.js';
import { Atributo } from '../entities/atributo.entity.js';

/**
 * Repositório para a entidade Atributo
 * Estende BaseRepository com métodos específicos para Atributo
 */
export class AtributoRepository extends BaseRepository<Atributo> {
  constructor() {
    super(Atributo);
  }

  async searchByName(nome: string): Promise<Atributo[]> {
    return this.getRepository()
      .createQueryBuilder('atributo')
      .where('atributo.nome ILIKE :nome', { nome: `%${nome}%` })
      .getMany();
  }
}