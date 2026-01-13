import { HttpInterceptorFn } from '@angular/common/http';

export const generalInterceptor: HttpInterceptorFn = (req, next) => {
	let jwtValue = localStorage.getItem('jwtValue');

	if(jwtValue) {
		let newReq = req.clone({
			setHeaders: {
				Authorization: `Bearer ${jwtValue}`
			}
		});

		return next(newReq);
	}

	return next(req);
};