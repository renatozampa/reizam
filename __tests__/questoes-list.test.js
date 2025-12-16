const fs = require('fs');

jest.mock('fs');

const {
    listarQuestoesPorMateria,
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

    describe('listarQuestoesPorMateria()', () => {

        beforeEach(() => {
            const questoesMock = [
                { id: 1, questao: "Q1", materia: "matematica" },
                { id: 2, questao: "Q2", materia: "portugues" },
                { id: 3, questao: "Q3", materia: "matematica" },
                { id: 4, questao: "Q4", materia: "historia" },
                { id: 5, questao: "Q5", materia: null }
            ];
            fs.readFileSync.mockReturnValue(JSON.stringify(questoesMock));
        });

        test('Cenário 31: Deve retornar todas as questões quando matéria não é fornecida', () => {
            const resultado = listarQuestoesPorMateria();
            expect(resultado.length).toBe(5);
        });

        test('Cenário 32: Deve retornar todas as questões quando matéria é null', () => {
            const resultado = listarQuestoesPorMateria(null);
            expect(resultado.length).toBe(5);
        });

        test('Cenário 33: Deve filtrar questões por matéria específica', () => {
            const resultado = listarQuestoesPorMateria("matematica");
            expect(resultado.length).toBe(2);
            expect(resultado[0].materia).toBe("matematica");
            expect(resultado[1].materia).toBe("matematica");
        });

        test('Cenário 34: Deve ser case-insensitive (maiúsculas/minúsculas)', () => {
            const resultado = listarQuestoesPorMateria("MATEMATICA");
            expect(resultado.length).toBe(2);
        });

        test('Cenário 35: Deve remover espaços extras da matéria buscada', () => {
            const resultado = listarQuestoesPorMateria("  matematica  ");
            expect(resultado.length).toBe(2);
        });
    });


});