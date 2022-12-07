import { httpService } from './http.service'

const BASE_URL = `codeblock/`

export const codeblockService = {
  query,
  getById,
  save,
  remove,
}

let gCodeblocks = [
  {
    id: 1,
    title: 'Async case',
    code: `async function asyncCall() {
      console.log('calling');
      const result = await resolveAfter2Seconds();
      console.log(result);
      // expected output: "resolved"
    }`,
  },
  {
    id: 2,
    title: 'Array map method',
    code: `const strings = ["10", "10", "10"];
    const numbers = strings.map(parseInt);
    
    console.log(numbers);`,
  },
  {
    id: 3,
    title: 'Reverse string',
    code: `const reverseString = string => [...string].reverse().join('');`,
  },
  {
    id: 4,
    title: 'For loop',
    code: `const n = 5;
    
    for (let i = 1; i <= n; i++) {
        console.log('I love JavaScript.');
    }`,
  },
]

async function query() {
  try {
    return gCodeblocks
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
