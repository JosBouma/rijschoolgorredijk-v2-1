<script setup lang="ts">
import { type Content } from "@prismicio/client";
import { type ZodIssue } from 'zod';

interface Fields {
  [name: string]: string | number;
}

interface ResponseBody {
  statusCode: number;
  statusMessage: string;
  validation: ZodIssue[];
}

// The array passed to `getSliceComponentProps` is purely optional.
// Consider it as a visual hint for you when templating your slice.
const props = defineProps(
  getSliceComponentProps<Content.SimpleFormSlice>([
    "slice",
    "index",
    "slices",
    "context",
  ]),
);

const prismic = usePrismic();
const fields = ref<Fields>({});
const errors = ref<{ [name: string]: ZodIssue }>({});
const fatal = ref<boolean>(false);
const errorCode = ref(-1);
const success = ref(false);
const loading = ref(false);
const parent = ref(null);

const response = await useAsyncData(props.slice.primary.form.uid, () =>
  prismic.client.getByUID('emailform', props.slice.primary.form.uid)
);

const { data: form } = response;

if (form) {
  for (const item of form.value?.data.fields as Content.EmailformDocumentDataFieldsItem[]) {
    fields.value[item.name as string] = '';
  }
}

async function submitForm() {
  if (loading.value) {
    return;
  }
  errors.value = {};
  try {
    loading.value = true;
    errorCode.value = -1;
    const res = await $fetch<ResponseBody>('/api/mail-send', {
      method: 'POST',
      query: {
        uid: props.slice.primary.form.uid
      },
      body: fields.value
    });

    if (200 !== res.statusCode) {
      errorCode.value = res.statusCode;
      fatal.value = true;
    }

    if (res.validation.length) {
      for (const err of res.validation) {
        errors.value[err.path[0] as string] = err;
        nextTick(() => {
          document.querySelector(`label[data-id="${err.path[0] as string}"]`)?.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
          });
        })
      }
    } else {
      success.value = true;
    }
  } catch (e) {
    fatal.value = true;
  }
  loading.value = false;
}
</script>

<style>
.simple-form form {
  max-width: 60rem;
  margin: 0 auto 6rem auto;
  padding: 0 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.simple-form form label {
  display: grid;
  grid-template-columns: 1fr 6fr;
  gap: 1rem;
  align-items: center;
}

.simple-form form label>span {
  font-weight: 700;
}

.simple-form form label input,
.simple-form form label textarea {
  height: fit-content;
  padding: 1rem;
}

.simple-form form label p {
  grid-column: 1 / -1;
}

.simple-form form label p span {
  display: block;
  padding: 1rem;
  background: rgb(255, 89, 0);
  color: #fff;
}

.simple-form .footer .fatal {
  margin: 1rem 0;
}

.simple-form .footer {
  display: flex;
  flex-direction: column;
}

.simple-form .footer button {
  display: grid;
  grid-template-columns: 1fr auto;
  height: fit-content;
  max-width: 30rem;
  margin-left: auto;
  gap: 1rem;
  align-items: center;
  padding: 1rem;
  background: var(--color-primary);
  color: #fff;
}
</style>

<template>
  <section class="simple-form" ref="parent">
    <form action="/" @submit.prevent="submitForm">
      <div class="heading">
        <prismic-rich-text :field="slice.primary.heading"></prismic-rich-text>
      </div>
      <template v-for="item in form?.data.fields">
        <label :data-id="item.name" v-if="'Text' === item.type" class="text">
          <p>
            <span v-if="errors[item.name || '']">{{ errors[item.name || ''].message }}</span>
          </p>
          <span>{{ item.label }}</span>
          <input type="text" v-model="fields[item.name || 'unnamed-field']" :disabled="success">
        </label>
        <label :data-id="item.name" v-if="'Number' === item.type" class="number">
          <p>
            <span v-if="errors[item.name || '']">{{ errors[item.name || ''].message }}</span>
          </p>
          <span>{{ item.label }}</span>
          <input type="number" v-model.number="fields[item.name || 'unnamed-field']" :disabled="success">
        </label>
        <label :data-id="item.name" v-if="'TextArea' === item.type" class="textarea">
          <p>
            <span v-if="errors[item.name || '']">{{ errors[item.name || ''].message }}</span>
          </p>
          <span>{{ item.label }}</span>
          <textarea cols="30" rows="10" v-model.number="fields[item.name || 'unnamed-field']" :disabled="success"></textarea>
        </label>
        <label :data-id="item.name" v-if="'Number' === item.type" class="number">
          <p>
            <span v-if="errors[item.name || '']">{{ errors[item.name || ''].message }}</span>
          </p>
          <span>{{ item.label }}</span>
          <input type="number" v-model.number="fields[item.name || 'unnamed-field']" :disabled="success">
        </label>
        <label :data-id="item.name" v-if="'Email' === item.type" class="email">
          <p>
            <span v-if="errors[item.name || '']">{{ errors[item.name || ''].message }}</span>
          </p>
          <span>{{ item.label }}</span>
          <input type="email" v-model.number="fields[item.name || 'unnamed-field']" :disabled="success">
        </label>
      </template>
      <div class="footer">
        <div v-if="fatal" class="fatal">
          <p>Er is een onverwachte fout opgetreden, probeer het later opnieuw</p>
          <p>Foutcode {{ errorCode }}</p>
        </div>
        <button type="submit" :disabled="success || loading">
          <span>Verstuur</span>
          <loading-animation v-if="loading" :style="{ '--color': '#fff' }"></loading-animation>
          <div v-if="!loading">
            <svgo-chevron></svgo-chevron>
          </div>
        </button>
      </div>
      <p>Success: {{ success }}</p>
    </form>
  </section>
</template>
