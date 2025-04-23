import { Injectable, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ResponsiveService {
  private breakPointObserver = inject(BreakpointObserver);

  isDesktop = toSignal(
    this.breakPointObserver
      .observe([Breakpoints.XSmall])
      .pipe(map((result) => result.matches)),
    { initialValue: false }
  );
}
