const fs = require('fs');

jest.mock('fs');

const {
    atualizarQuestao,
    adicionarQuestao,
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

    describe('adicionarQuestao()', () => {

        beforeEach(() => {
            fs.readFileSync.mockReturnValue(JSON.stringify([
                { id: 1, questao: "Teste", correta: "A" }
            ]));
            fs.writeFileSync.mockImplementation(() => { });
        });

        test('Cenário 20: Deve adicionar questão com ID gerado automaticamente', () => {
            const novaQuestao = { questao: "Nova pergunta", correta: "b" };
            const resultado = adicionarQuestao(novaQuestao);

            expect(resultado).toHaveProperty('id');
            expect(resultado.id).toBe(2);
        });

        test('Cenário 21: Deve normalizar resposta correta para maiúscula', () => {
            const novaQuestao = { questao: "Teste", correta: "b" };
            const resultado = adicionarQuestao(novaQuestao);

            expect(resultado.correta).toBe("B");
        });

        test('Cenário 22: Deve manter resposta correta já em maiúscula', () => {
            const novaQuestao = { questao: "Teste", correta: "C" };
            const resultado = adicionarQuestao(novaQuestao);

            expect(resultado.correta).toBe("C");
        });

        test('Cenário 23: Deve chamar writeFileSync para salvar', () => {
            const novaQuestao = { questao: "Teste", correta: "A" };
            adicionarQuestao(novaQuestao);

            expect(fs.writeFileSync).toHaveBeenCalled();
        });

        test('Cenário 24: Deve retornar a questão adicionada completa', () => {
            const novaQuestao = {
                questao: "Quanto é 2+2?",
                alternativaA: "3",
                alternativaB: "4",
                correta: "b",
                materia: "matematica"
            };
            const resultado = adicionarQuestao(novaQuestao);

            expect(resultado.questao).toBe("Quanto é 2+2?");
            expect(resultado.alternativaA).toBe("3");
            expect(resultado.alternativaB).toBe("4");
            expect(resultado.correta).toBe("B");
        });

    });

    describe('atualizarQuestao()', () => {

        beforeEach(() => {
            const questoesMock = [
                { id: 1, questao: "Teste 1", correta: "A", materia: "matematica" },
                { id: 2, questao: "Teste 2", correta: "B", materia: "portugues" }
            ];
            fs.readFileSync.mockReturnValue(JSON.stringify(questoesMock));
            fs.writeFileSync.mockImplementation(() => { });
        });

        test('Cenário 25: Deve atualizar questão existente', () => {
            expect(() => {
                atualizarQuestao(1, { questao: "Nova pergunta" });
            }).not.toThrow();
        });

        

        
    });



});