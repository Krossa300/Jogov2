import 'reflect-metadata';

// Exportar configurações
export * from './config/database';

// Exportar entidades base
export * from './entities/base.entity';

// Exportar entidades
export * from './entities/user.entity';

// Exportar repositórios
export * from './repositories/base.repository';
export * from './repositories/user.repository';

// Exportar serviços
export * from './services/user.service';

// Exportar decorators
export * from './decorators';

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
