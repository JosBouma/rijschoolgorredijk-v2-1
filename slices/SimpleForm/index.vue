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
const success = ref(false);
const loading = ref(false);

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
  try {
    loading.value = true;
    // let url = `/api/mail-send?uid=${encodeURIComponent(props.slice.primary.form.uid)}`;
    const repsonse = await $fetch<ResponseBody>('/api/mail-send', {
      method: 'POST',
      query: {
        uid: props.slice.primary.form.uid
      },
      body: fields.value
    });

    repsonse.validation = repsonse.validation || [];
    for (const err of repsonse.validation) {
      errors.value[err.path[0] as string] = err;
    }
  } catch (e) {
    console.log(typeof e);
  }
  loading.value = false;
}
</script>

<template>
  <section class="simple-form">
    <prismic-rich-text :field="slice.primary.heading"></prismic-rich-text>
    <form action="/" v-if="form && !success" @submit.prevent="submitForm">
      <template v-for="item in form?.data.fields">
        <label v-if="'Text' === item.type" :class="item.type.toLowerCase()">
          <span>{{ item.label }}</span>
          <input type="text" v-model="fields[item.name || 'unnamed-field']">
          <p v-if="errors[item.name || '']">{{ errors[item.name || ''].message }}</p>
        </label>
        <label v-if="'Number' === item.type" :class="item.type.toLowerCase()">
          <span>{{ item.label }}</span>
          <input type="number" v-model.number="fields[item.name || 'unnamed-field']">
          <p v-if="errors[item.name || '']">{{ errors[item.name || ''].message }}</p>
        </label>
      </template>
      <button type="submit">
        <span>Verstuur</span>
        <loading-animation v-if="loading"></loading-animation>
        <div v-if="!loading">
          <svgo-chevron></svgo-chevron>
        </div>
      </button>
    </form>
    <dev-only>
      <pre>{{ fields }}</pre>
      <pre>{{ errors }}</pre>
    </dev-only>
  </section>
</template>
