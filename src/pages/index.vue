<script setup lang="ts">
import { RandomCountries } from '~/widgets/RandomCountries'
import { useDotsAnimation } from '~/entities/dots'
import { useCountries } from '~/shared/api/country'

const { data, isLoading } = useCountries()

const { animatedDots } = useDotsAnimation()

const searchQuery = ref('')
const debouncedSearchQuery = refDebounced(searchQuery, 300)

const countries = computed(() => (data.value ? data.value.flat() : []))

const filteredCountries = computed(() => {
  if (countries.value && debouncedSearchQuery.value) {
    return countries.value.filter((country) =>
      country.name
        .toLocaleLowerCase()
        .includes(debouncedSearchQuery.value.toLocaleLowerCase())
    )
  }

  return countries.value
})

const randomCountries = computed(() => {
  return [...countries.value].sort(() => 0.5 - Math.random()).slice(0, 3)
})
</script>

<template>
  <Head>
    <Title>Countries</Title>
  </Head>

  <div v-if="isLoading">Loading{{ animatedDots }}</div>
  <div v-else-if="!data">Not found data</div>
  <div v-else class="flex gap-20">
    <div class="w-full max-w-lg">
      <input
        v-model="searchQuery"
        class="mb-8 border px-4 py-2 text-sm focus:outline-blue-600"
        placeholder="Search input"
      />
      <p class="mb-8 text-xl">Countries List</p>
      <ul class="max-h-[60vh] space-y-4 overflow-y-auto px-2 no-scrollbar">
        <NuxtLink
          v-for="country in filteredCountries"
          :key="country.countryCode"
          class="block border p-5 text-center"
          :to="{ name: 'country-code', params: { code: country.countryCode } }"
        >
          {{ country.name }}
        </NuxtLink>
      </ul>
    </div>
    <div class="w-full">
      <p class="mb-8 text-xl">Random Countries Widget</p>
      <RandomCountries :countries="randomCountries" />
    </div>
  </div>
</template>
