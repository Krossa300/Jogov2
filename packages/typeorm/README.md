# @jogov2/typeorm

Biblioteca TypeORM configurada para o projeto Jogov2, fornecendo uma estrutura robusta para gerenciamento de banco de dados com TypeScript.

## Características

- ✅ Configuração TypeORM com suporte a múltiplos bancos de dados
- ✅ Entidade base com campos comuns (ID, timestamps, soft delete)
- ✅ Repositório base com operações CRUD
- ✅ Validação com class-validator
- ✅ Decorators customizados
- ✅ Suporte a transações
- ✅ Exemplos práticos

## Instalação

```bash
npm install @jogov2/typeorm
```

## Uso Básico

### 1. Configuração da Conexão

```typescript
import { initializeDatabase, postgresConfig } from '@jogov2/typeorm';

// Inicializar conexão
const dataSource = await initializeDatabase(postgresConfig);
```

### 2. Definindo uma Entidade

```typescript
import { Entity, Column } from 'typeorm';
import { BaseEntity } from '@jogov2/typeorm';

@Entity('products')
export class Product extends BaseEntity {
  @Column()
  name!: string;

  @Column('decimal')
  price!: number;

  @Column()
  description!: string;
}
```

### 3. Criando um Repositório

```typescript
import { BaseRepository } from '@jogov2/typeorm';
import { Product } from './product.entity';

export class ProductRepository extends BaseRepository<Product> {
  constructor() {
    super(Product);
  }

  async findByPriceRange(min: number, max: number): Promise<Product[]> {
    return this.getRepository()
      .createQueryBuilder('product')
      .where('product.price >= :min AND product.price <= :max', { min, max })
      .getMany();
  }
}
```

### 4. Implementando um Serviço

```typescript
import { ProductRepository } from './product.repository';

export class ProductService {
  private productRepository = new ProductRepository();

  async createProduct(data: CreateProductData): Promise<Product> {
    return this.productRepository.create(data);
  }

  async getProductById(id: string): Promise<Product | null> {
    return this.productRepository.findById(id);
  }
}
```

## Entidades Incluídas

### User Entity
A biblioteca inclui uma entidade `User` de exemplo com os seguintes campos:
- `name` - Nome do usuário
- `email` - Email único
- `password` - Senha (opcional)
- `isActive` - Status ativo/inativo
- `role` - Papel do usuário
- `bio` - Biografia
- `phone` - Telefone
- `birthDate` - Data de nascimento

## Configurações de Banco

A biblioteca suporta vários bancos de dados:

```typescript
import { 
  postgresConfig, 
  mysqlConfig, 
  sqliteConfig, 
  sqlServerConfig 
} from '@jogov2/typeorm';
```

## BaseEntity

Todas as entidades herdam de `BaseEntity` que inclui:
- `id` - UUID primário
- `createdAt` - Data de criação
- `updatedAt` - Data de atualização
- `deletedAt` - Data de exclusão (soft delete)
- `createdBy` - Usuário que criou
- `updatedBy` - Usuário que atualizou

## BaseRepository

O `BaseRepository` fornece métodos CRUD padrão:
- `findAll()` - Buscar todos
- `findById(id)` - Buscar por ID
- `findBy(criteria)` - Buscar por critério
- `create(data)` - Criar novo
- `update(id, data)` - Atualizar
- `delete(id)` - Remover
- `softDelete(id)` - Exclusão lógica
- `count(criteria)` - Contar registros
- `exists(criteria)` - Verificar existência

## Variáveis de Ambiente

```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=password
DB_NAME=jogov2
NODE_ENV=development
```

## Scripts Úteis

```bash
# Construir a biblioteca
nx build typeorm

# Executar testes
nx test typeorm

# Lint
nx lint typeorm
```

## Exemplos Avançados

### Transações
```typescript
import { getConnection } from '@jogov2/typeorm';

const connection = getConnection();
await connection.transaction(async manager => {
  const user = await manager.save(User, userData);
  const profile = await manager.save(Profile, { userId: user.id });
});
```

### Query Builder
```typescript
const users = await userRepository.getRepository()
  .createQueryBuilder('user')
  .where('user.isActive = :active', { active: true })
  .andWhere('user.role IN (:...roles)', { roles: ['admin', 'user'] })
  .orderBy('user.createdAt', 'DESC')
  .limit(10)
  .getMany();
```

## Building

Run `nx build typeorm` to build the library.

## Running unit tests

Run `nx test typeorm` to execute the unit tests via [Jest](https://jestjs.io).

## Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

## Licença

MIT
