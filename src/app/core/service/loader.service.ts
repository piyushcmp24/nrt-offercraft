import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LoaderService {
  private count = 0;
  private loadingSubject = new BehaviorSubject<boolean>(false);
  isLoading$ = this.loadingSubject.asObservable();

  show(): void {
    this.count++;
    this.loadingSubject.next(true);
  }

  hide(): void {
    this.count = Math.max(this.count - 1, 0);
    if (this.count === 0) {
      this.loadingSubject.next(false);
    }
  }
}