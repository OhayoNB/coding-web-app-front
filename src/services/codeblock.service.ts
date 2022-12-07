import { httpService } from './http.service'

const BASE_URL = `codeblock/`

export const codeblockService = {
  query,
  getById,
  save,
  remove,
}

async function query() {
  try {
    return httpService.get(BASE_URL)
  } catch (err) {
    console.log('Cannot get entities', err)
  }
}

async function getById(entityId: string) {
  try {
    return httpService.get(BASE_URL + entityId)
  } catch (err) {
    console.log('Cannot get codeblock', err)
  }
}

async function remove(entityId: string) {
  try {
    return httpService.delete(BASE_URL + entityId)
  } catch (err) {
    console.log('Cannot remove codeblock', err)
  }
}

async function save(codeblock: { _id: string }) {
  if (codeblock._id) {
    console.log('INSIDE PUT')
    try {
      return httpService.put(BASE_URL + codeblock._id, codeblock)
    } catch (err) {
      console.log('Cannot edit entities', err)
    }
  } else {
    console.log('INSIDE POST')
    try {
      return httpService.post(BASE_URL, codeblock)
    } catch (err) {
      console.log('Cannot add entities', err)
    }
  }
}
