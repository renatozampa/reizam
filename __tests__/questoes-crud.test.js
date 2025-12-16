const fs = require('fs');

jest.mock('fs');

const {
    buscarQuestaoPorId,
} = require('../src/lib/library');

describe('CRUD de Questões', () => {

    describe('buscarQuestaoPorId()', () => {

        beforeEach(() => {
            const questoesMock = [
                { id: 1, questao: "Quanto é 2+2?", correta: "A" },
                { id: 2, questao: "Quanto é 3+3?", correta: "B" },
                { id: 5, questao: "Quanto é 5+5?", correta: "C" }
            ];
            fs.readFileSync.mockReturnValue(JSON.stringify(questoesMock));
        });

        test('Cenário 11: Deve encontrar questão por ID existente', () => {
            const resultado = buscarQuestaoPorId(1);
            expect(resultado).toBeDefined();
            expect(resultado.id).toBe(1);
        });

        test('Cenário 12: Deve retornar questão com dados corretos', () => {
            const resultado = buscarQuestaoPorId(2);
            expect(resultado.questao).toBe("Quanto é 3+3?");
            expect(resultado.correta).toBe("B");
        });

        test('Cenário 13: Deve retornar undefined para ID inexistente', () => {
            const resultado = buscarQuestaoPorId(99999999);
            expect(resultado).toBeUndefined();
        });

        test('Cenário 14: Deve funcionar com IDs numéricos grandes', () => {
            fs.readFileSync.mockReturnValue(JSON.stringify([
                { id: 1, questao: "Q1" },
                { id: 9999999999, questao: "Q grande" }
            ]));

            const resultado = buscarQuestaoPorId(9999999999);
            expect(resultado).toBeDefined();
            expect(resultado.id).toBe(9999999999);
            expect(resultado.questao).toBe("Q grande");
        });

        test('Cenário 15: Deve aceitar ID como string e converter', () => {
            const resultado = buscarQuestaoPorId("1");
            expect(resultado).toBeDefined();
            expect(resultado.id).toBe(1);
        });




    })

});