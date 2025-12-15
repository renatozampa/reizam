const {
    login
} = require('../src/lib/library');

describe('Autenticação', () => {
    
    describe('login()', () => {
        
        test('Cenário 1: Deve fazer login com credenciais válidas', () => {
            const resultado = login('renato@gmail.com', 'zampa');
            expect(resultado).toBe(true);
        });    

         test('Cenário 2: Deve lançar erro quando email não é fornecido', () => {
            expect(() => {
                login('', 'zampa');
            }).toThrow('Email e senha devem estar preenchidos');
        });
    });
});