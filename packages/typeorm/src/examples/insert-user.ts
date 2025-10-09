import 'reflect-metadata';
import { pathToFileURL } from 'node:url';
import { initializeDatabase, postgresConfig } from '../lib/config/database.js';
import { UserService } from '../lib/services/user.service.js';

/**
 * Script de exemplo para inserir usuários no banco de dados
 */
async function insertUser() {
  try {
    console.log('🚀 Inicializando conexão com o banco de dados...');
    
    // Inicializar a conexão com o banco
    await initializeDatabase(postgresConfig);
    console.log('✅ Conexão estabelecida com sucesso!');

    // Criar instância do serviço
    const userService = new UserService();

    // Dados do usuário para inserir
    const userData = {
      name: 'Lucas ins',
      email: 'lus@exemplo.com',
      password: 'senhasenha',
      role: 'admin',
    };

    console.log('👤 Criando usuário:', userData.name);

    // Inserir o usuário
    const newUser = await userService.createUser(userData);

    console.log('✅ Usuário criado com sucesso!');
    console.log('📋 Dados do usuário:');
    console.log(`   ID: ${newUser.id}`);
    console.log(`   Nome: ${newUser.name}`);
    console.log(`   Email: ${newUser.email}`);
    console.log(`   Role: ${newUser.role}`);
    console.log(`   Ativo: ${newUser.isActive}`);
    console.log(`   Criado em: ${newUser.createdAt}`);

    // Verificar se o usuário foi inserido consultando por email
    console.log('\n🔍 Verificando se o usuário foi inserido...');
    const foundUser = await userService.getUserByEmail(userData.email);
    
    if (foundUser) {
      console.log('✅ Usuário encontrado na base de dados!');
      console.log(`   Nome: ${foundUser.name}`);
      console.log(`   Email: ${foundUser.email}`);
    } else {
      console.log('❌ Usuário não foi encontrado na base de dados.');
    }

    // Listar todos os usuários ativos
    console.log('\n📊 Usuários ativos no sistema:');
    const activeUsers = await userService.getActiveUsers();
    console.log(`   Total de usuários ativos: ${activeUsers.length}`);
    
    activeUsers.forEach((user, index) => {
      console.log(`   ${index + 1}. ${user.name} (${user.email})`);
    });

  } catch (error) {
    console.error('❌ Erro ao inserir usuário:', error);
    
    if (error instanceof Error) {
      if (error.message.includes('Email já está em uso')) {
        console.log('💡 Dica: Tente com um email diferente ou remova o usuário existente.');
      }
      if (error.message.includes('connection')) {
        console.log('💡 Dica: Verifique se o banco de dados está rodando e as configurações estão corretas.');
      }
    }
  } finally {
    // Fechar a conexão
    const { DatabaseConnection } = await import('../lib/config/database.js');
    await DatabaseConnection.getInstance().close();
    console.log('\n🔌 Conexão com o banco fechada.');
    process.exit(0);
  }
}

/**
 * Script para inserir múltiplos usuários de exemplo
 */
async function insertMultipleUsers() {
  try {
    console.log('🚀 Inicializando conexão com o banco de dados...');
    
    await initializeDatabase(postgresConfig);
    console.log('✅ Conexão estabelecida com sucesso!');

    const userService = new UserService();

    const usersData = [
      {
        name: 'Maria Santos',
        email: 'maria.santos@exemplo.com',
        role: 'admin',
      },
      {
        name: 'Pedro Oliveira',
        email: 'pedro.oliveira@exemplo.com',
        role: 'user',
      },
      {
        name: 'Ana Costa',
        email: 'ana.costa@exemplo.com',
        role: 'moderator',
      }
    ];

    console.log(`👥 Inserindo ${usersData.length} usuários...`);

    const createdUsers = [];
    for (const userData of usersData) {
      try {
        const user = await userService.createUser(userData);
        createdUsers.push(user);
        console.log(`✅ Usuário criado: ${user.name} (${user.email})`);
      } catch (error) {
        console.log(`⚠️  Erro ao criar ${userData.name}: ${error}`);
      }
    }

    console.log(`\n📈 Resumo: ${createdUsers.length}/${usersData.length} usuários criados com sucesso!`);

  } catch (error) {
    console.error('❌ Erro geral:', error);
  } finally {
    const { DatabaseConnection } = await import('../lib/config/database.js');
    await DatabaseConnection.getInstance().close();
    console.log('\n🔌 Conexão com o banco fechada.');
    process.exit(0);
  }
}

// Executar o script
if (import.meta.url === pathToFileURL(process.argv[1] ?? '').href) {
  const args = process.argv.slice(2);
  
  if (args.includes('--multiple')) {
    console.log('📝 Executando inserção de múltiplos usuários...\n');
    insertMultipleUsers();
  } else {
    console.log('📝 Executando inserção de usuário único...\n');
    insertUser();
  }
}