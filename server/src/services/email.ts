export class EmailService {
    async sendPaymentConfirmation(email: string, name: string, plan: string, password?: string): Promise<void> {
        // MOCK EMAIL SENDING
        console.log('\n=================================================');
        console.log(`[EmailService] Sending payment confirmation to: ${email}`);
        console.log(`Subject: Pagamento Aprovado - ViralCuts`);
        console.log(`Body:`);
        console.log(`Olá ${name},`);
        console.log(`Seu pagamento para o plano ${plan} foi confirmado!`);
        console.log(`\n-----------------------------------`);
        console.log(`DETALHES DA SUA CONTA:`);
        console.log(`Email de acesso: ${email}`);
        if (password) {
            console.log(`Senha temporária: ${password}`);
            console.log(`Acesse em: http://localhost:5173/admin`);
        } else {
            console.log(`Sua conta já esta ativa. Acesse o painel para ver seu novo plano.`);
        }
        console.log(`-----------------------------------\n`);
        console.log(`Obrigado por assinar o ViralCuts.`);
        console.log('=================================================\n');
    }
}

export const emailService = new EmailService();
