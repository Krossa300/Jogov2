import 'reflect-metadata';
import { pathToFileURL } from 'node:url';
import { initializeDatabase } from '../lib/config/database.js';
import { postgresConfig } from '../lib/config/examples.js';
import { AtributoService } from '../lib/services/atributo.service.js';

/**
 * Script de exemplo para inserir usuários no banco de dados
 */
async function insertAtributo() {
  try {
    console.log('🚀 Inicializando conexão com o banco de dados...');
    
    // Inicializar a conexão com o banco
    await initializeDatabase(postgresConfig);
    console.log('✅ Conexão estabelecida com sucesso!');

    const atributoService = new AtributoService();

    const atributoData = {
      nome: 'Força',
    };

    console.log('👤 Criando atributo:', atributoData.nome);

    // Inserir o atributo
    const newAtributo = await atributoService.createAtributo(atributoData);

    console.log('✅ Atributo criado com sucesso!');
    console.log(`   ID: ${newAtributo.id}`);
    console.log(`   Nome: ${newAtributo.nome}`);
    console.log(`   Criado em: ${newAtributo.createdAt}`);

    // Verificar se o atributo foi inserido consultando por nome
    console.log('\n🔍 Verificando se o atributo foi inserido...');
    const findAtributos = await atributoService.getAllAtributos();
    
    if (findAtributos.length > 0) {
      console.log('✅ Atributo encontrado na base de dados!');
      findAtributos.forEach((atributo, index) => {
        console.log(`   ${index + 1}. ${atributo.nome}`);
      });
    } else {
      console.log('❌ Atributo não foi encontrado na base de dados.');
    }    

  } catch (error) {
    console.error('❌ Erro ao inserir usuário:', error);
    
  } finally {
    // Fechar a conexão
    const { DatabaseConnection } = await import('../lib/config/database.js');
    await DatabaseConnection.getInstance().close();
    console.log('\n🔌 Conexão com o banco fechada.');
    process.exit(0);
  }
}

/**
 * Script para inserir múltiplos atributos de exemplo
 */
async function insertMultipleAtributos() {
  try {
    console.log('🚀 Inicializando conexão com o banco de dados...');
    
    await initializeDatabase(postgresConfig);
    console.log('✅ Conexão estabelecida com sucesso!');

    const atributoService = new AtributoService();

    const atributosData = [
      {
        nome: 'Agilidade',
      },
      {
        nome: 'Inteligência',
      },
      {
        nome: 'Vitalidade',
      },
      {
        nome: 'Destreza',
      },
      {
        nome: 'Sorte',
      }
    ];

    console.log(`👥 Inserindo ${atributosData.length} usuários...`);

    const createdAtributos = [];
    for (const atributoData of atributosData) {
      try {
        const atributo = await atributoService.createAtributo(atributoData);
        createdAtributos.push(atributo);
        console.log(`✅ Atributo criado: ${atributo.nome}`);
      } catch (error) {
        console.log(`⚠️  Erro ao criar ${atributoData.nome}: ${error}`);
      }
    }

    console.log(`\n📈 Resumo: ${createdAtributos.length}/${atributosData.length} atributos criados com sucesso!`);

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
    console.log('📝 Executando inserção de múltiplos atributos...\n');
    insertMultipleAtributos();
  } else {
    console.log('📝 Executando inserção de atributo único...\n');
    insertAtributo();
  }
}