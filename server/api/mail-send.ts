const repositoryName = 'rijschoolgorredijk-v2-1';
import { Content, Client } from "@prismicio/client";
import pug from 'pug';
import FormData from 'form-data';
import Mailgun from 'mailgun.js';

interface RequestBody {
    fields: {
        [idx: string]: string;
    }
}

interface ResponseBody {
    statusCode: number,
    statusMessage: string,
    validation: Array<
        {
            name: string;
            errorMessage: string
        }
    >;
}

const client = new Client(repositoryName);
const tplFn = pug.compileFile('./pug/default.pug');

function validate(form: Content.EmailformDocument, data: RequestBody): Array<{ name: string, errorMessage: string }> {
    const errors: Array<{ name: string, errorMessage: string }> = [];
    const fields: { [name: string]: string } = {};
    const types: { [name: string]: string } = {};
    for (const field of form.data.fields) {
        fields[field.name as string] = data.fields[field.name as string];
        types[field.name as string] = field.type;
    }
    for (const item of form.data.required_fields) {
        const name = item.name as string;
        if (!(name in data.fields)) {
            errors.push({
                name: name,
                errorMessage: 'Dit veld is verplicht'
            });
            continue;
        }
        switch (types[name]) {
            case 'Text':
                if (!String(data.fields[name]).trim()) {
                    errors.push({
                        name: name,
                        errorMessage: 'Dit veld is verplicht'
                    });
                }
                break;
            case 'Number':
                if (isNaN(parseFloat(data.fields[name]))) {
                    errors.push({
                        name: name,
                        errorMessage: 'Dit veld moet een getal zijn'
                    });
                }
                break;
        }
    }
    return errors;
}

function extractFields(form: Content.EmailformDocument, data: RequestBody): RequestBody {
    const fields: { [idx: string]: string } = {};
    for (const item of form.data.fields) {
        fields[item.name as string] = data.fields[item.name as string];
    }
    data.fields = fields;
    return data;
}

async function sendMail(form: Content.EmailformDocument, data: RequestBody): Promise<boolean> {
    console.log('Sending form', form.uid, data);

    const client = new Mailgun(FormData).client({
        username: 'api',
        key: process.env.MAILGUN_KEY as string
    });

    const message: any = {
        from: form.data.from,
        to: form.data.recipients.map((item) => item.email),
        subject: form.data.subject,
        text: "Dit bericht is in HTML formaat",
        html: tplFn(data)
    };

    if(form.data.reply_to && form.data.reply_to in data.fields) {
        message['h:Reply-To'] = data.fields[form.data.reply_to];
    }

    const response = await client.messages.create(form.data.domain as string, message);
    return true;
}

export default defineEventHandler(async (evt) => {
    let body: ResponseBody = {
        statusCode: 500,
        statusMessage: 'Internet fout',
        validation: []
    };
    try {
        // if('POST' !== evt.method) {
        //     body.statusCode = 405;
        //     throw new Error('Methode niet toegestaan');
        // }
        // const inputBody = await readBody(evt);
        const inputBody: RequestBody = {
            fields: {
                naam: 'Bla',
                blaat: 'Niet bestaand veld'
            }
        };

        const form = await client.getByUID('emailform', 'contact-formulier') as Content.EmailformDocument;
        if (!form) {
            body.statusCode = 404;
            throw new Error('Formulier niet gevonden');
        }

        body.validation = validate(form, inputBody);
        if (0 !== body.validation.length) {
            body.statusCode = 406;
            throw new Error('Ongeldige invoer');
        }

        const result = await sendMail(form, extractFields(form, inputBody));

        if (!result) {
            throw new Error('Fout bij verzenden vam mail');
        }

        body.statusCode = 200;
        body.statusMessage = 'Bericht verzonden';
    } catch (e) {
        console.error('Error caught', e);
        body.statusCode = 500;
        body.statusMessage = (e as Error).message;
    }

    setHeaders(evt, {
        'Content-Type': 'application/json'
    });
    // console.log('Mailgun key', process.env.MAILGUN_KEY);
    setResponseStatus(evt, body.statusCode, body.statusMessage);
    return body;
});