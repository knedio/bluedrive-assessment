import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environments';
import {
  RandomIntegerPayload,
  RandomIntegerResponse,
} from '../models/random-integer.model';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RandomIntegerHttp {
  private url = `${environment.apiBaseUrl}${environment.apiPath}/randominteger/`;

  constructor(private http: HttpClient) {}

  getRandomIntegers(
    payload: RandomIntegerPayload
  ): Promise<RandomIntegerResponse> {
    return lastValueFrom(
      this.http.get<RandomIntegerResponse>(`${this.url}`, {
        params: { ...payload },
      })
    );
  }

  generateNewRandomInteger(): Promise<{ value: number }> {
    return lastValueFrom(
      this.http.get<{ value: number }>(`${this.url}generate/`, {})
    );
  }
}
