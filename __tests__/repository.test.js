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

    });

});