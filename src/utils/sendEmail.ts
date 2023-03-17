import nodemailer from 'nodemailer';
import envVars from '../config';

interface SendEmailProps {
	email: string;
	subject: string;
	text: string;
}

export const sendEmail = async (props: SendEmailProps) => {
	const { email, subject, text } = props;

	const transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			user: envVars.EMAIL,
			pass: envVars.EMAIL_PASSWORD,
		},
	});

	const mailOptions = {
		from: 'Finance App.',
		to: email,
		subject,
		text,
	};

	await transporter.sendMail(mailOptions);
};
