import { Codeblock } from 'models/Codeblock'
import { httpService } from './http.service'

const BASE_URL = `codeblock/`

export const codeblockService = {
  query,
  getById,
  update,
}

async function query() {
  try {
    return httpService.get(BASE_URL)
  } catch (err) {
    console.log('Cannot get codeblocks', err)
  }
}

async function getById(codeblockId: string) {
  try {
    return httpService.get(BASE_URL + codeblockId)
  } catch (err) {
    console.log('Cannot get codeblock', err)
  }
}

async function update(codeblock: Codeblock) {
  try {
    if (codeblock._id) {
      return httpService.put(BASE_URL + codeblock._id, codeblock)
    }
  } catch (err) {
    console.log('Cannot update codeblock', err)
  }
}
