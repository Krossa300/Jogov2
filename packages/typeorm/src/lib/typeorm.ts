import 'reflect-metadata';

// Exportar configurações
export * from './config/database.js';

// Exportar entidades base
export * from './entities/base.entity.js';

// Exportar entidades
export * from './entities/user.entity.js';
export * from './entities/atributo.entity.js';

// Exportar repositórios
export * from './repositories/base.repository.js';
export * from './repositories/user.repository.js';

// Exportar serviços
export * from './services/user.service.js';
export * from './services/atributo.service.js';

// Exportar decorators
export * from './decorators/index.js';

/**
 * Função principal da biblioteca TypeORM
 * Retorna informações sobre a biblioteca
 */
export function typeorm(): string {
  return '@jogov2/typeorm - Biblioteca TypeORM configurada para o projeto Jogov2';
}

/**
 * Versão da biblioteca
 */
export const VERSION = '1.0.0';
