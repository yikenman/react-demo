import { Injectable } from "injection-js";
import { BehaviorSubject, interval } from "rxjs";
import { map } from "rxjs/operators";

@Injectable()
export class TimerService {
  public timer$ = new BehaviorSubject<number>(0);
  protected timerCold$ = interval(1000)
    .pipe(map(v => v + 1))
    .subscribe(this.timer$);
}
