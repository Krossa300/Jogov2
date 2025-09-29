import { UserRepository } from '../repositories/user.repository';
import { User } from '../entities/user.entity';
import { validate } from 'class-validator';

/**
 * Interface para dados de criação de usuário
 */
export interface CreateUserData {
  name: string;
  email: string;
  password?: string;
  role?: string;
}

/**
 * Interface para dados de atualização de usuário
 */
export interface UpdateUserData {
  name?: string;
  email?: string;
  password?: string;
  role?: string;
  isActive?: boolean;
}

/**
 * Serviço para gerenciar usuários
 * Contém a lógica de negócio para operações com usuários
 */
export class UserService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  /**
   * Lista todos os usuários
   */
  async getAllUsers(): Promise<User[]> {
    return this.userRepository.findAll();
  }

  /**
   * Lista apenas usuários ativos
   */
  async getActiveUsers(): Promise<User[]> {
    return this.userRepository.findActiveUsers();
  }

  /**
   * Busca usuário por ID
   */
  async getUserById(id: string): Promise<User | null> {
    return this.userRepository.findById(id);
  }

  /**
   * Busca usuário por email
   */
  async getUserByEmail(email: string): Promise<User | null> {
    return this.userRepository.findByEmail(email);
  }

  /**
   * Cria um novo usuário
   */
  async createUser(userData: CreateUserData): Promise<User> {
    // Verifica se o email já existe
    const existingUser = await this.userRepository.findByEmail(userData.email);
    if (existingUser) {
      throw new Error('Email já está em uso');
    }

    // Cria a instância do usuário
    const user = new User();
    Object.assign(user, userData);

    // Valida os dados
    const errors = await validate(user);
    if (errors.length > 0) {
      const errorMessages = errors.map(error => 
        Object.values(error.constraints || {}).join(', ')
      ).join('; ');
      throw new Error(`Dados inválidos: ${errorMessages}`);
    }

    return this.userRepository.create(userData);
  }

  /**
   * Atualiza um usuário existente
   */
  async updateUser(id: string, userData: UpdateUserData): Promise<User | null> {
    const existingUser = await this.userRepository.findById(id);
    if (!existingUser) {
      throw new Error('Usuário não encontrado');
    }

    // Se está atualizando o email, verifica se não existe outro usuário com o mesmo email
    if (userData.email && userData.email !== existingUser.email) {
      const emailExists = await this.userRepository.emailExists(userData.email);
      if (emailExists) {
        throw new Error('Email já está em uso');
      }
    }

    return this.userRepository.update(id, userData);
  }

  /**
   * Remove um usuário (soft delete)
   */
  async deleteUser(id: string): Promise<boolean> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    return this.userRepository.softDelete(id);
  }

  /**
   * Desativa um usuário
   */
  async deactivateUser(id: string): Promise<User | null> {
    return this.userRepository.deactivateUser(id);
  }

  /**
   * Ativa um usuário
   */
  async activateUser(id: string): Promise<User | null> {
    return this.userRepository.activateUser(id);
  }

  /**
   * Busca usuários por nome
   */
  async searchUsersByName(name: string): Promise<User[]> {
    if (!name || name.trim().length < 2) {
      throw new Error('Nome deve ter pelo menos 2 caracteres');
    }

    return this.userRepository.searchByName(name);
  }

  /**
   * Conta usuários ativos
   */
  async getActiveUsersCount(): Promise<number> {
    return this.userRepository.countActiveUsers();
  }

  /**
   * Lista usuários por role
   */
  async getUsersByRole(role: string): Promise<User[]> {
    return this.userRepository.findByRole(role);
  }
}