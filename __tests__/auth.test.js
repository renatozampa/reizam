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

        test('Cenário 3: Deve lançar erro quando senha não é fornecida', () => {
            expect(() => {
                login('renato@gmail.com', '');
            }).toThrow('Email e senha devem estar preenchidos');
        });

        test('Cenário 4: Deve lançar erro quando ambos email e senha não são fornecidos', () => {
            expect(() => {
                login('', '');
            }).toThrow('Email e senha devem estar preenchidos');
        });

          test('Cenário 5: Deve lançar erro com email inválido', () => {
            expect(() => {
                login('email@errado.com', 'zampa');
            }).toThrow('Esse usuário não é verificado!');
        });

         test('Cenário 6: Deve lançar erro com senha inválida', () => {
            expect(() => {
                login('renato@gmail.com', 'senhaErrada');
            }).toThrow('Esse usuário não é verificado!');
        });
    });
});