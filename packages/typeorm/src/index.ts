// Re-exportar tudo da biblioteca principal
export * from './lib/typeorm.js';

// Exportações adicionais para conveniência
export { DataSource, Repository } from 'typeorm';
export type { EntityTarget } from 'typeorm';
export { validate } from 'class-validator';
export type { ValidationError } from 'class-validator';
