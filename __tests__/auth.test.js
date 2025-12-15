const {
    login
} = require('../src/lib/library');

describe('Autenticação', () => {
    
    describe('login()', () => {
        
        test('Cenário 1: Deve fazer login com credenciais válidas', () => {
            const resultado = login('renato@gmail.com', 'zampa');
            expect(resultado).toBe(true);
        });    
    });
});