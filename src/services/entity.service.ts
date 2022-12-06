import { httpService } from './http.service.js'

const BASE_URL = `entity/`

export const entityService = {
   query,
   getById,
   save,
   remove,
}

// let gEntities = []

async function query(filterBy: {} | undefined) {
   try {
      return httpService.get(BASE_URL, filterBy)
   } catch (err) {
      console.log('Cannot get entities', err)
   }
}

async function getById(entityId: string) {
   try {
      return httpService.get(BASE_URL + entityId)
   } catch (err) {
      console.log('Cannot get entity', err)
   }
}

async function remove(entityId: string) {
   try {
      return httpService.delete(BASE_URL + entityId)
   } catch (err) {
      console.log('Cannot remove entity', err)
   }
}

async function save(entity: { _id: string }) {
   if (entity._id) {
      console.log('INSIDE PUT')
      try {
         return httpService.put(BASE_URL + entity._id, entity)
      } catch (err) {
         console.log('Cannot edit entities', err)
      }
   } else {
      console.log('INSIDE POST')
      try {
         return httpService.post(BASE_URL, entity)
      } catch (err) {
         console.log('Cannot add entities', err)
      }
   }
}
