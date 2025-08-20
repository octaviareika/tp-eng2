import nodemailer from 'nodemailer';

// Configure transporter with environment variables for security
const transporter = nodemailer.createTransport({
	host: process.env.SMTP_HOST,
	port: Number(process.env.SMTP_PORT) || 587,
	secure: false,
	auth: {
		user: process.env.SMTP_USER,
		pass: process.env.SMTP_PASS,
	},
});

export async function sendRecoveryEmail(to: string, senha: string) {
	const mailOptions = {
		from: process.env.SMTP_FROM || 'no-reply@ufop.br',
		to,
		subject: 'Recuperação de Senha - Portal UFOP',
		text: `Sua senha de acesso é: ${senha}`,
		html: `<p>Sua senha de acesso é: <strong>${senha}</strong></p>`,
	};
	try {
		await transporter.sendMail(mailOptions);
		return { success: true };
	} catch (error: any) {
		return { success: false, error: error.message };
	}
}