<script setup lang="ts">
import { useDotsAnimation } from '~/entities/dots'

import { useCountryInfo } from '~/shared/api/country'
import { useCountryHolidays } from '~/shared/api/holiday'
import { cn } from '~/shared/lib'

const route = useRoute()

const years = [2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030]

const selectedYear = ref(new Date().getFullYear())

const { animatedDots } = useDotsAnimation()

const { data: country } = useCountryInfo({ code: route.params.code.toString() })

const { data: holidays, isLoading } = useCountryHolidays({
  year: selectedYear,
  code: route.params.code.toString(),
})

const title = computed(() =>
  country.value ? country.value?.commonName : 'Country'
)
</script>

<template>
  <Head>
    <Title>{{ title }}</Title>
  </Head>

  <div v-if="isLoading">Loading{{ animatedDots }}</div>
  <div v-else-if="!holidays">Not found holidays</div>
  <div v-else>
    <h3 class="mb-10 text-xl">
      {{ country?.commonName }}
    </h3>
    <div
      class="mb-6 max-h-[75vh] no-scrollbar max-w-lg space-y-4 overflow-y-auto"
    >
      <div
        v-for="holiday in holidays"
        :key="holiday.localName.trim()"
        class="border p-5"
      >
        <p>{{ holiday.name }}</p>
        <p>{{ holiday.date }}</p>
      </div>
    </div>
    <div class="flex gap-5">
      <button
        v-for="year in years"
        :key="year"
        :class="
          cn(
            'rounded-md px-2 py-1 text-white',
            selectedYear === year ? 'bg-blue-500' : 'bg-blue-600'
          )
        "
        @click="selectedYear = year"
      >
        {{ year }}
      </button>
    </div>
  </div>
</template>
