import { Session } from './../models/Session'
import { httpService } from './http.service'

const BASE_URL = `session/`

export const sessionService = {
  query,
  getById,
  save,
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

async function save(session: Session) {
  try {
    return httpService.post(BASE_URL, session)
  } catch (err) {
    console.log('Cannot add entities', err)
  }
}
