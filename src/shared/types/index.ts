export interface Country {
  name: string
  countryCode: string
}

export interface CountryInfo {
  borders: CountryInfo[] | null
  commonName: string
  countryCode: string
  officialName: string
  region: string
}

export interface Holiday {
  counties: Country[] | null
  countryCode: string
  date: string
  fixed: boolean
  global: boolean
  launchYear: number | null
  localName: string
  name: string
  types: string[]
}
