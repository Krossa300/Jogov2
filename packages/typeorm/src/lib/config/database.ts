import { DataSource, DataSourceOptions } from 'typeorm';

/**
 * Interface para configuração da conexão com banco de dados
 */
export interface DatabaseConfig {
  type: 'postgres' | 'mysql' | 'mariadb' | 'sqlite' | 'mssql';
  host?: string;
  port?: number;
  username?: string;
  password?: string;
  database?: string;
  synchronize?: boolean;
  logging?: boolean;
  entities?: string[];
  migrations?: string[];
  subscribers?: string[];
  ssl?: boolean | object;
}

/**
 * Classe para gerenciar a conexão com o banco de dados
 */
export class DatabaseConnection {
  private static instance: DatabaseConnection;
  private dataSource: DataSource | null = null;

  private constructor() {}

  /**
   * Retorna a instância singleton da conexão
   */
  public static getInstance(): DatabaseConnection {
    if (!DatabaseConnection.instance) {
      DatabaseConnection.instance = new DatabaseConnection();
    }
    return DatabaseConnection.instance;
  }

  /**
   * Inicializa a conexão com o banco de dados
   */
  public async initialize(config: DatabaseConfig): Promise<DataSource> {
    if (this.dataSource && this.dataSource.isInitialized) {
      return this.dataSource;
    }

    const dataSourceOptions: DataSourceOptions = {
      type: config.type,
      host: config.host || 'localhost',
      port: config.port,
      username: config.username,
      password: config.password,
      database: config.database,
      synchronize: config.synchronize || false,
      logging: config.logging || false,
      entities: config.entities || [],
      migrations: config.migrations || [],
      subscribers: config.subscribers || [],
      ssl: config.ssl || false,
    } as DataSourceOptions;

    this.dataSource = new DataSource(dataSourceOptions);
    await this.dataSource.initialize();

    return this.dataSource;
  }

  /**
   * Retorna a instância do DataSource
   */
  public getDataSource(): DataSource | null {
    return this.dataSource;
  }

  /**
   * Fecha a conexão com o banco de dados
   */
  public async close(): Promise<void> {
    if (this.dataSource && this.dataSource.isInitialized) {
      await this.dataSource.destroy();
      this.dataSource = null;
    }
  }

  /**
   * Verifica se a conexão está ativa
   */
  public isConnected(): boolean {
    return this.dataSource?.isInitialized || false;
  }
}

/**
 * Função utilitária para obter a conexão com o banco
 */
export function getConnection(): DataSource | null {
  return DatabaseConnection.getInstance().getDataSource();
}

/**
 * Função utilitária para inicializar a conexão
 */
export function initializeDatabase(config: DatabaseConfig): Promise<DataSource> {
  return DatabaseConnection.getInstance().initialize(config);
}