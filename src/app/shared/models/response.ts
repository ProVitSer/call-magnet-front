import { HttpStatusCode } from "@angular/common/http";

export class HttpResponse<T> {
    statusCode: HttpStatusCode;
    message?: string | string[] | any;
    result?: boolean;
    errors?: string | { [key: string]: any };
    data?: T;
    path: string;
    timestamp: string;
    createdBy: string;
}
