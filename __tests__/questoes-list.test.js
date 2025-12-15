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
    });


});