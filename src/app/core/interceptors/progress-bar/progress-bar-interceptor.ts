import { HttpInterceptorFn } from '@angular/common/http';
import { ProgressBarService } from '../../components/progress-bar/progress-bar.service';
import { inject } from '@angular/core';
import { finalize } from 'rxjs';

export const progressBarInterceptor: HttpInterceptorFn = (req, next) => {
  const progressBarService = inject(ProgressBarService);
  progressBarService.showProgress();
  return next(req).pipe(
    finalize(() => {
      progressBarService.hideProgress();
    })
  );
};
