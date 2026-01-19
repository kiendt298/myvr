import { NextRequest, NextResponse } from 'next/server';
import { errorHandler } from './error-handler';


function apiHandler(handler: any) {
    const wrappedHandler: any = {};
    const httpMethods: string[] = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'];

    httpMethods.forEach((method: string) => {
        if (typeof handler[method] !== 'function')
            return;

        wrappedHandler[method] = async function (req: NextRequest, ...args: any){
            try {
                const { responseBody, options } = await handler[method](req, ...args);
                return NextResponse.json(responseBody || {}, options);
            } catch (e: any) {
                return errorHandler(e);
            }
        };
    });

    return wrappedHandler;
}

export { apiHandler };
