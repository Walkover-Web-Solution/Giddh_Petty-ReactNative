import { environment } from './../environments/environment.prod';


export const createUrl = (url: string) => {
    return `${environment.apiUrl}/${url}`;
};