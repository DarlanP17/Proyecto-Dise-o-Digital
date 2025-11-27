import { ZodError } from 'zod';

export const errorHandler = (err, req, res, next) => {
	console.error('Error middleware:', err);

	if (err instanceof ZodError) {
		return res.status(400).json({ success: false, errors: err.errors });
	}

	if (err.status && typeof err.status === 'number') {
		return res.status(err.status).json({ success: false, message: err.message });
	}

	res.status(500).json({ success: false, message: err.message || 'Error interno del servidor' });
};

export default errorHandler;