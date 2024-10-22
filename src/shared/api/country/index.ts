import type { Country, CountryInfo } from '~/shared/types'

export function useCountries() {
  return useQuery({
    queryKey: ['country', 'all'],
    queryFn: async () => {
      return (await fetch(
        `${useRuntimeConfig().public.baseApiUrl}/AvailableCountries`
      ).then((r) => r.json())) as Country[][]
    },
  })
}

export function useCountryInfo({ code }: { code: string }) {
  return useQuery({
    queryKey: ['country', 'info', code],
    queryFn: async () => {
      return (await fetch(
        `${useRuntimeConfig().public.baseApiUrl}/CountryInfo/${code}`
      ).then((r) => r.json())) as CountryInfo
    },
  })
}
