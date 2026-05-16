<script setup lang="ts">
import { ref, computed } from 'vue'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'
import { useI18n } from '@/composables/useI18n'
import type { ServiceOption } from '@/i18n/es'

const { t, tRaw } = useI18n()

// Zod schema for form validation
const contactSchema = z.object({
  name: z
    .string()
    .min(1, 'Name is required')
    .min(2, 'Name must be at least 2 characters'),
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email'),
  company: z.string().optional(),
  service: z.string().optional(),
  message: z
    .string()
    .min(1, 'Message is required')
    .min(10, 'Message must be at least 10 characters'),
})

type ContactFormData = z.infer<typeof contactSchema>

// VeeValidate form setup
const { defineField, handleSubmit, errors, resetForm, meta } = useForm<ContactFormData>({
  validationSchema: toTypedSchema(contactSchema),
  initialValues: {
    name: '',
    email: '',
    company: '',
    service: '',
    message: '',
  },
})

// Define form fields with validation
const [name, nameAttrs] = defineField('name')
const [email, emailAttrs] = defineField('email')
const [company, companyAttrs] = defineField('company')
const [service, serviceAttrs] = defineField('service')
const [message, messageAttrs] = defineField('message')

// Form status
type FormStatus = 'idle' | 'submitting' | 'success' | 'error'
const status = ref<FormStatus>('idle')

// Get service options from translations
const serviceOptions = computed(() => tRaw<ServiceOption[]>('contact.form.serviceOptions'))

// Netlify form encode function
const encode = (data: Record<string, string>): string => {
  return Object.keys(data)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(data[key] ?? '')}`)
    .join('&')
}

// Form submission handler
const onSubmit = handleSubmit(async (values) => {
  status.value = 'submitting'
  
  try {
    const response = await fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({
        'form-name': 'contact',
        name: values.name,
        email: values.email,
        company: values.company ?? '',
        service: values.service ?? '',
        message: values.message,
      }),
    })
    
    if (response.ok) {
      status.value = 'success'
      resetForm()
    } else {
      throw new Error('Form submission failed')
    }
  } catch {
    status.value = 'error'
  }
})

// Reset status to allow retry
const resetStatus = (): void => {
  status.value = 'idle'
}

// Helper to check if field has error and was touched
const hasError = (fieldName: keyof typeof errors.value): boolean => {
  return !!errors.value[fieldName]
}
</script>

<template>
  <!-- Netlify hidden form for bot detection -->
  <form name="contact" netlify netlify-honeypot="bot-field" hidden>
    <input type="text" name="name" />
    <input type="email" name="email" />
    <input type="text" name="company" />
    <input type="text" name="service" />
    <textarea name="message"></textarea>
  </form>

  <!-- Success State -->
  <div 
    v-if="status === 'success'" 
    class="rounded-xl border border-green-500/30 bg-green-500/10 p-6 text-center"
  >
    <svg 
      class="mx-auto h-12 w-12 text-green-500" 
      fill="none" 
      viewBox="0 0 24 24" 
      stroke="currentColor" 
      stroke-width="1.5"
    >
      <path 
        stroke-linecap="round" 
        stroke-linejoin="round" 
        d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
      />
    </svg>
    <p class="mt-4 text-lg font-medium text-green-600 dark:text-green-400">
      {{ t('contact.form.success') }}
    </p>
  </div>

  <!-- Error State -->
  <div 
    v-else-if="status === 'error'" 
    class="rounded-xl border border-red-500/30 bg-red-500/10 p-6 text-center"
  >
    <svg 
      class="mx-auto h-12 w-12 text-red-500" 
      fill="none" 
      viewBox="0 0 24 24" 
      stroke="currentColor" 
      stroke-width="1.5"
    >
      <path 
        stroke-linecap="round" 
        stroke-linejoin="round" 
        d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" 
      />
    </svg>
    <p class="mt-4 text-lg font-medium text-red-600 dark:text-red-400">
      {{ t('contact.form.error') }}
    </p>
    <button
      type="button"
      class="mt-4 rounded-lg bg-red-500/20 px-4 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-500/30 dark:text-red-400"
      @click="resetStatus"
    >
      {{ t('common.close') }}
    </button>
  </div>

  <!-- Contact Form -->
  <form 
    v-else
    name="contact"
    method="POST"
    data-netlify="true"
    data-netlify-honeypot="bot-field"
    class="space-y-5"
    @submit="onSubmit"
  >
    <!-- Hidden fields for Netlify -->
    <input type="hidden" name="form-name" value="contact" />
    <p class="hidden">
      <label>
        Don't fill this out: <input name="bot-field" />
      </label>
    </p>

    <!-- Name Field -->
    <div>
      <label for="name" class="mb-2 block text-sm font-medium text-foreground">
        {{ t('contact.form.name') }} <span class="text-red-500">*</span>
      </label>
      <input
        id="name"
        v-model="name"
        v-bind="nameAttrs"
        type="text"
        name="name"
        :placeholder="t('contact.form.namePlaceholder')"
        class="w-full rounded-lg border bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
        :class="[
          hasError('name') 
            ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' 
            : 'border-border'
        ]"
      />
      <p v-if="errors.name" class="mt-1 text-sm text-red-500">
        {{ errors.name }}
      </p>
    </div>

    <!-- Email Field -->
    <div>
      <label for="email" class="mb-2 block text-sm font-medium text-foreground">
        {{ t('contact.form.email') }} <span class="text-red-500">*</span>
      </label>
      <input
        id="email"
        v-model="email"
        v-bind="emailAttrs"
        type="email"
        name="email"
        :placeholder="t('contact.form.emailPlaceholder')"
        class="w-full rounded-lg border bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
        :class="[
          hasError('email') 
            ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' 
            : 'border-border'
        ]"
      />
      <p v-if="errors.email" class="mt-1 text-sm text-red-500">
        {{ errors.email }}
      </p>
    </div>

    <!-- Company Field (Optional) -->
    <div>
      <label for="company" class="mb-2 block text-sm font-medium text-foreground">
        {{ t('contact.form.company') }}
      </label>
      <input
        id="company"
        v-model="company"
        v-bind="companyAttrs"
        type="text"
        name="company"
        :placeholder="t('contact.form.companyPlaceholder')"
        class="w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
      />
    </div>

    <!-- Service Dropdown -->
    <div>
      <label for="service" class="mb-2 block text-sm font-medium text-foreground">
        {{ t('contact.form.service') }}
      </label>
      <select
        id="service"
        v-model="service"
        v-bind="serviceAttrs"
        name="service"
        class="w-full appearance-none rounded-lg border border-border bg-background px-4 py-3 text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
      >
        <option value="" disabled>{{ t('contact.form.servicePlaceholder') }}</option>
        <option 
          v-for="option in serviceOptions" 
          :key="option.value" 
          :value="option.value"
        >
          {{ option.label }}
        </option>
      </select>
    </div>

    <!-- Message Field -->
    <div>
      <label for="message" class="mb-2 block text-sm font-medium text-foreground">
        {{ t('contact.form.message') }} <span class="text-red-500">*</span>
      </label>
      <textarea
        id="message"
        v-model="message"
        v-bind="messageAttrs"
        name="message"
        :placeholder="t('contact.form.messagePlaceholder')"
        rows="4"
        class="w-full resize-none rounded-lg border bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
        :class="[
          hasError('message') 
            ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' 
            : 'border-border'
        ]"
      ></textarea>
      <p v-if="errors.message" class="mt-1 text-sm text-red-500">
        {{ errors.message }}
      </p>
    </div>

    <!-- Submit Button -->
    <button
      type="submit"
      :disabled="status === 'submitting' || !meta.valid"
      class="w-full rounded-lg bg-primary px-4 py-3 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50"
    >
      <span v-if="status === 'submitting'" class="flex items-center justify-center gap-2">
        <svg 
          class="h-4 w-4 animate-spin" 
          fill="none" 
          viewBox="0 0 24 24"
        >
          <circle 
            class="opacity-25" 
            cx="12" 
            cy="12" 
            r="10" 
            stroke="currentColor" 
            stroke-width="4"
          />
          <path 
            class="opacity-75" 
            fill="currentColor" 
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
        {{ t('contact.form.submitting') }}
      </span>
      <span v-else>{{ t('contact.form.submit') }}</span>
    </button>
  </form>
</template>
