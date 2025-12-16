const fs = require('fs');

jest.mock('fs');

const {
    gerarNovoID
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

});