const fs = require('fs');

jest.mock('fs');

const {
    gerarNovoID,
    salvarQuestoes
} = require('../src/lib/library');

describe('Repositório e Persistência', () => {

    describe('gerarNovoID()', () => {

        test('Cenário 16: Deve retornar 1 quando não há questões', () => {
            fs.readFileSync.mockReturnValue(JSON.stringify([]));
            const resultado = gerarNovoID();
            expect(resultado).toBe(1);
        });

        test('Cenário 17: Deve retornar próximo ID sequencial', () => {
            fs.readFileSync.mockReturnValue(JSON.stringify([
                { id: 1 }, { id: 2 }, { id: 3 }
            ]));
            const resultado = gerarNovoID();
            expect(resultado).toBe(4);
        });

        test('Cenário 18: Deve incrementar corretamente IDs não sequenciais', () => {
            fs.readFileSync.mockReturnValue(JSON.stringify([
                { id: 1 }, { id: 5 }, { id: 10 }
            ]));
            const resultado = gerarNovoID();
            expect(resultado).toBe(11);
        });

        test('Cenário 19: Deve funcionar com apenas uma questão', () => {
            fs.readFileSync.mockReturnValue(JSON.stringify([{ id: 1 }]));
            const resultado = gerarNovoID();
            expect(resultado).toBe(2);
        });

    });

    describe('salvarQuestoes()', () => {
        
        beforeEach(() => {
            fs.writeFileSync.mockImplementation(() => {});
            jest.clearAllMocks()
        });

        test('Cenário 39: Deve retornar true ao salvar com sucesso', () => {
            const resultado = salvarQuestoes([{ id: 1, questao: "Teste" }]);
            expect(resultado).toBe(true);
        });

        test('Cenário 40: Deve chamar writeFileSync com dados corretos', () => {
            const dados = [{ id: 1, questao: "Teste" }];
            salvarQuestoes(dados);
            
            expect(fs.writeFileSync).toHaveBeenCalled();
            const chamada = fs.writeFileSync.mock.calls[0];
            expect(JSON.parse(chamada[1])).toEqual(dados);
        });

        test('Cenário 41: Deve salvar array vazio corretamente', () => {
            salvarQuestoes([]);
            
            const chamada = fs.writeFileSync.mock.calls[0][1];
            expect(JSON.parse(chamada)).toEqual([]);
        });

        test('Cenário 42: Deve formatar JSON com 4 espaços', () => {
            salvarQuestoes([{ id: 1 }]);
            
            const chamada = fs.writeFileSync.mock.calls[0][1];
            
            expect(chamada).toContain('    '); 
            expect(chamada).toContain('[\n    {\n');
        });
        
    });

});