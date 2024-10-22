import type { Holiday } from '~/shared/types'

export function useCountryHolidays({
  code,
  year,
}: {
  year: Ref<number>
  code: string
}) {
  return useQuery({
    queryKey: ['country', 'holidays', year, code],
    queryFn: async () => {
      return (await fetch(
        `${useRuntimeConfig().public.baseApiUrl}/PublicHolidays/${year.value}/${code}`
      ).then((r) => r.json())) as Holiday[]
    },
  })
}

export function useCountryNextHolidays({ code }: { code: string }) {
  return useQuery({
    queryKey: ['country', 'holidays', code],
    queryFn: async () => {
      return (await fetch(
        `${useRuntimeConfig().public.baseApiUrl}/NextPublicHolidays/${code}`
      ).then((r) => r.json())) as Holiday[]
    },
  })
}
