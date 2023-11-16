const repositoryName = 'rijschoolgorredijk-v2-1';
import { Content, Client } from "@prismicio/client";
import pug from 'pug';
import FormData from 'form-data';
import Mailgun from 'mailgun.js';
import { z } from 'zod';

enum InputType {
    Text = 'Text',
    TextArea = 'TextArea',
    Number = 'Number',
    Email = 'Email'
}

interface RequestBody {
    fields: {
        [idx: string]: string;
    }
}

interface ResponseBody {
    statusCode: number;
    statusMessage: string;
    validation: any[];
}

const client = new Client(repositoryName);
const tplFn = pug.compileFile('./pug/default.pug');

function createSchema(form: Content.EmailformDocument) {
    const required: { [name: string]: boolean } = {};
    const schema: any = {};
    
    for (const item of form.data.required_fields) {
        required[item.name as string] = true;
    }

    for (const item of form.data.fields) {
        const name = item.name as string;
        const msg = item.error_message || '';
        schema[name] = z.string();
        switch (item.type) {
            case InputType.Text:
                if (required[name]) {
                    schema[name] = z.string().min(2, msg);
                }
                break;
            case InputType.TextArea:
                if (required[name]) {
                    schema[name] = z.string().min(10, msg);
                }
                break;
            case InputType.Email:
                schema[name] = z.string().email(msg);
                if (!required[name]) {
                    schema[name] = z.string().email(msg).optional();
                }
                break;
            case InputType.Number:
                schema[name] = z.coerce.number({
                    required_error: item.error_message as string
                }).positive({
                    message: item.error_message as string
                });

                if (!required[name]) {
                    schema[name] = schema[name].optional();
                }
                break;
        }
    }
    return schema;
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

    if (form.data.reply_to && form.data.reply_to in data.fields) {
        message['h:Reply-To'] = data.fields[form.data.reply_to];
    }

    return true;

    const response = await client.messages.create(form.data.domain as string, message);
    return 200 === response.status;
}

export default defineEventHandler<{ body: RequestBody, query: { uid: string } }>(async (evt) => {
    const body: ResponseBody = {
        statusCode: 500,
        statusMessage: 'Interne fout',
        validation: []
    };

    const query = getQuery(evt);

    try {
        if ('POST' !== evt.method) {
            body.statusCode = 405;
            throw new Error('Methode niet toegestaan');
        }

        const form = await client.getByUID('emailform', query.uid) as Content.EmailformDocument;

        if (!form) {
            body.statusCode = 404;
            throw new Error('Formulier niet gevonden');
        }

        let inputBody = await readBody<any>(evt);
        const schema = z.object(createSchema(form)).strict();
        console.log('Validatiing', inputBody);
        const schemaResult = schema.safeParse(inputBody);

        if (!schemaResult.success) {
            body.statusCode = 200;
            body.validation = schemaResult.error.issues;
            throw new Error('Ongeldige invoer');
        }

        body.validation = [];

        const mgResult = await sendMail(form, inputBody);

        if (!mgResult) {
            throw new Error('Fout bij verzenden vam mail');
        }

        body.statusCode = 200;
        body.statusMessage = 'Bericht verzonden';
    } catch (e) {
        body.statusMessage = (e as Error).message;
    }

    setResponseStatus(evt, body.statusCode, body.statusMessage);
    return body;
});