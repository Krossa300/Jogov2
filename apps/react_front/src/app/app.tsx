import { useState, useEffect } from 'react';
import { IAtributoBase } from '@jogov2/shared-interfaces';
import TabelaDeAtributos from '../componentes/TabelaDeAtributos';

export function App() {
  const [atributos, setAtributos] = useState<IAtributoBase[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const url = 'http://localhost:3333/api/atributos';

  useEffect(() => {
    const fetchAtributos = async () => {
      try {
        setLoading(true);
        const response = await fetch(url);
        
        if (!response.ok) {
          throw new Error(`Erro ao buscar atributos: ${response.status}`);
        }
        
        const data: IAtributoBase[] = await response.json();
        setAtributos(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro desconhecido');
        console.error('Erro ao buscar atributos:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAtributos();
  }, [url]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-stone-600 font-serif">Carregando atributos...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-red-600 font-serif">Erro: {error}</div>
      </div>
    );
  }

  return (
    <div>
      <TabelaDeAtributos atributos={atributos} />
    </div>
  );
}
export default App;
