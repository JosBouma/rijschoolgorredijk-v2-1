// const repositoryName = 'rijschoolgorredijk-v2-1';
// import { Content, Client } from "@prismicio/client";

import pug from 'pug';

function renderTemplate(file: string, data: object = {}): string {
    const result = pug.compileFile(file);
    return result(data);
}

export default defineEventHandler((evt) => {
    if('POST' !== getMethod(evt)) {
        setResponseStatus(evt, 405, 'Method not allowed, bye!');
        return {
            statusCode: 406,
            message: 'Method not allowed'
        };
    }
    const body = readBody(evt);
    // return renderTemplate(
    //     './default.pug',
    //     {
    //         statusCode: 201
    //     }
    // );
    // try {
    //     // const method = getMethod(evt);
    //     // const body = readBody(evt);
    //     return renderTemplate(
    //         './default.pug',
    //         {
    //             statusCode: 200
    //         }
    //     );
    // } catch(e) {
    //     // setResponseStatus(evt, 500);
    //     return {
    //         statusCode: 500
    //     };
    // }
    // const client = new Client(repositoryName);
});