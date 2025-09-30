import { AtributoRepository } from '../repositories/atributo.repository.js';
import { Atributo } from '../entities/atributo.entity.js';

/**
 * Interface para dados de criação de atributo
 */
export interface CreateAtributoData {
  nome: string;
}

/**
 * Serviço para gerenciar usuários
 * Contém a lógica de negócio para operações com usuários
 */
export class AtributoService {
  private atributoRepository: AtributoRepository;

  constructor() {
    this.atributoRepository = new AtributoRepository();
  }

  /**
   * Lista todos os atributos
   */
  async getAllAtributos(): Promise<Atributo[]> {
    return this.atributoRepository.findAll();
  }

  /**
   * Cria um novo atributo
   */
  async createAtributo(atributoData: CreateAtributoData): Promise<Atributo> {
    // Cria a instância do atributo
    const atributo = new Atributo();
    Object.assign(atributo, atributoData);

    return this.atributoRepository.create(atributo);
  }
}