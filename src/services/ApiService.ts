import axios, { AxiosError, AxiosResponse } from 'axios';

import { IApiCallback } from '@types';

export class ApiService {
    public API_callback: IApiCallback;

    private API_URL = 'https://';

    constructor(apiCallback: IApiCallback) {
        this.API_callback = apiCallback;
    }

    async initApi(): Promise<boolean> {
        return Promise.resolve(true);
    }

    responseBuilder<T>(response: Promise<AxiosResponse<T>>) {
        return new Promise((resolve, reject) => {
            response
                .then((data) => {
                    resolve({ status: data.status, message: data.statusText, data: data.data });
                })
                .catch((err: AxiosError) => {
                    reject(err.code);
                });
        });
    }

    get<T>(link: string) {
        return this.responseBuilder<T>(axios.get<T>(this.API_URL + link));
    }

    post<T>(link: string, data: T) {
        return this.responseBuilder<T>(axios.post<T>(this.API_URL + link, data));
    }

    put<T>(link: string, data: T) {
        return this.responseBuilder<T>(axios.put<T>(this.API_URL + link, data));
    }

    delete<T>(link: string) {
        return this.responseBuilder<T>(axios.delete<T>(this.API_URL + link));
    }
}
