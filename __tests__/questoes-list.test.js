const fs = require('fs');

jest.mock('fs');

const {
    listarQuestoes,
} = require('../src/lib/library');

describe('Listagem de Questões', () => {
    
   
    describe('listarQuestoes()', () => {
        
        beforeEach(() => {
            const questoesMock = [
                { id: 1, questao: "Teste 1", materia: "matematica", correta: "A" },
                { id: 2, questao: "Teste 2", materia: "portugues", correta: "B" }
            ];
            
            fs.readFileSync.mockReturnValue(JSON.stringify(questoesMock));
        });

        test('Cenário 8: Deve retornar array de questões', () => {
            const resultado = listarQuestoes();
            expect(Array.isArray(resultado)).toBe(true);
        });

        test('Cenário 9: Deve retornar questões com estrutura correta', () => {
            const resultado = listarQuestoes();
            expect(resultado[0]).toHaveProperty('id');
            expect(resultado[0]).toHaveProperty('questao');
            expect(resultado[0]).toHaveProperty('materia');
            expect(resultado[0]).toHaveProperty('correta');
        });

        test('Cenário 10: Deve retornar array vazio quando não há questões', () => {
            fs.readFileSync.mockReturnValue(JSON.stringify([]));
            const resultado = listarQuestoes();
            expect(resultado).toEqual([]);
            expect(resultado.length).toBe(0);
        });
    });


});