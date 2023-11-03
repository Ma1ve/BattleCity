export const BASE_URL = 'https://ya-praktikum.tech/api/v2/'
export const RESOURCES_URL = `${BASE_URL}resources`
export const AUTH_URL = `${BASE_URL}auth`
export const OAUTH_URL = `${BASE_URL}oauth/yandex`

// http://veisa.ya-praktikum.tech/api
export const SERVER_URL = 'http://localhost:3001/api/'

export const redirectUri =
  typeof window !== 'undefined' ? window.location.origin : null
