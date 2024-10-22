<script setup lang="ts">
import { useDotsAnimation } from '~/entities/dots'
import { useCountryNextHolidays } from '~/shared/api/holiday'

interface Props {
  name: string
  countryCode: string
}

const props = defineProps<Props>()

const { countryCode } = toRefs(props)

const { animatedDots } = useDotsAnimation()

const { data: holidays, isLoading } = useCountryNextHolidays({
  code: countryCode.value,
})

const holiday = computed(() => holidays.value && holidays.value[0])

const date = computed(() => {
  const newDate = new Date(holiday.value!.date)

  return newDate.toLocaleDateString('en-US', {
    weekday: 'long',
    month: '2-digit',
    day: '2-digit',
    year: 'numeric',
  })
})
</script>

<template>
  <div class="border px-5 py-3">
    <div v-if="isLoading">Loading{{ animatedDots }}</div>
    <div v-else-if="!holiday">not found country</div>
    <div v-else class="space-y-2">
      <h3>
        {{ name }}
      </h3>
      <p>
        {{ holiday.name }}
      </p>
      <p>
        {{ date }}
      </p>
    </div>
  </div>
</template>
