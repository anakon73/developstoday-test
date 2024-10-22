<script setup lang="ts">
import type { Country } from '~/shared/types'
import { RandomCountryCard } from './ui/card'

defineProps<{ countries: Country[] }>()
</script>

<template>
  <div class="space-y-4 border p-5">
    <RandomCountryCard
      v-for="country in countries"
      :key="country.countryCode"
      :="country"
    />
  </div>
</template>
