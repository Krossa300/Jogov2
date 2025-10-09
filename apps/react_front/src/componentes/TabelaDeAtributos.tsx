import React from 'react';
import { IAtributoBase } from '@jogov2/shared-interfaces';

interface TabelaDeAtributosProps {
    atributos: IAtributoBase[];
}

const TabelaDeAtributos: React.FC<TabelaDeAtributosProps> = ({ atributos }) => {
    if (!atributos || atributos.length === 0) {
        return (
            <section className="font-serif text-stone-800">
                <div className="max-w-2xl mx-auto p-4 sm:p-6">
                    <div className="bg-amber-50/95 rounded-lg border-2 border-stone-700 shadow-md ring-1 ring-stone-700/10">
                        <header className="px-4 sm:px-6 py-3 border-b-2 border-stone-700/60 bg-amber-100/70">
                            <h2 className="text-2xl sm:text-3xl tracking-wide uppercase text-stone-800 select-none">
                                Ficha de Atributos
                            </h2>
                            <p className="text-stone-600 text-sm mt-1">✦ Registro dos valores base ✦</p>
                        </header>
                        <div className="p-6 text-center text-stone-600">
                            Nenhum atributo disponível.
                        </div>
                        <footer className="px-4 sm:px-6 py-2 border-t-2 border-stone-700/60 text-center text-xs text-stone-600">
                            “Que os deuses favoreçam seus testes.”
                        </footer>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="font-serif text-stone-800">
            <div className="max-w-2xl mx-auto p-4 sm:p-6">
                <div className="bg-amber-50/95 backdrop-blur rounded-lg border-2 border-stone-700 shadow-md ring-1 ring-stone-700/10">
                    <header className="px-4 sm:px-6 py-3 border-b-2 border-stone-700/60 bg-amber-100/70">
                        <h2 className="text-2xl sm:text-3xl tracking-wide uppercase text-stone-800 select-none">
                            Ficha de Atributos
                        </h2>
                        <p className="text-stone-600 text-sm mt-1">✦ Registro dos valores base ✦</p>
                    </header>

                    <div className="p-4 sm:p-6">
                        <table className="w-full table-fixed border-collapse text-stone-900" aria-label="Tabela de Atributos">
                            <thead>
                                <tr className="bg-amber-100/70 text-stone-800">
                                    <th className="w-20 py-2 px-3 text-left border-b-2 border-stone-700/50">ID</th>
                                    <th className="py-2 px-3 text-left border-b-2 border-stone-700/50">Nome</th>
                                    <th className="w-32 py-2 px-3 text-left border-b-2 border-stone-700/50">Código</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-stone-700/20">
                                {atributos.map((attr) => (
                                    <tr key={attr.id} className="odd:bg-amber-50/70 even:bg-amber-100/40">
                                        <td className="py-2 px-3">{attr.id}</td>
                                        <td className="py-2 px-3">{attr.nome}</td>
                                        <td className="py-2 px-3 text-stone-700">{attr.codigo || '-'}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <footer className="px-4 sm:px-6 py-2 border-t-2 border-stone-700/60 text-center text-xs text-stone-600">
                        “Que os deuses favoreçam seus testes.”
                    </footer>
                </div>
            </div>
        </section>
    );
};

export default TabelaDeAtributos;