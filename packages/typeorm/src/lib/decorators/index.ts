import 'reflect-metadata';

/**
 * Helper para definir metadata
 */
const setMetadata = (key: string, value: any) => 
  (target: any, propertyKey?: string | symbol) => {
    if (propertyKey) {
      Reflect.defineMetadata(key, value, target, propertyKey);
    } else {
      Reflect.defineMetadata(key, value, target);
    }
  };

/**
 * Decorator para marcar métodos que devem ser executados em uma transação
 */
export const Transactional = () => setMetadata('transactional', true);

/**
 * Decorator para marcar entidades como auditáveis
 */
export const Auditable = () => setMetadata('auditable', true);

/**
 * Decorator para definir índices nas entidades
 */
export const IndexedField = (name?: string) => setMetadata('indexed', name || true);

/**
 * Decorator para campos que devem ser criptografados
 */
export const Encrypted = () => setMetadata('encrypted', true);

/**
 * Decorator para validação customizada
 */
export const ValidateWith = (validator: (value: any) => boolean) => 
  setMetadata('validator', validator);