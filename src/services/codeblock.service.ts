import { httpService } from './http.service'

const BASE_URL = `codeblock/`

export const codeblockService = {
  query,
  getById,
}

async function query() {
  try {
    return httpService.get(BASE_URL)
  } catch (err) {
    console.log('Cannot get entities', err)
  }
}

async function getById(codeblockId: string | undefined) {
  try {
    return httpService.get(BASE_URL + codeblockId)
  } catch (err) {
    console.log('Cannot get codeblock', err)
  }
}
