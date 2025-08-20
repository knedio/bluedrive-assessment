import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../../environments/environments';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authReq = req.clone({
    setHeaders: {
      Authorization: `Token ${environment.apiToken}`,
    },
  });
  return next(authReq);
};
