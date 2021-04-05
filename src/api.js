import {writable} from 'svelte/store';
export const url = 'http://localhost:8000'

export function retryWrapper(func, ...params) {
  const maxRetries = 5;
  const timeout = 0;
  const cache = true

  const cacheIt = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  }
  const getCache = (key) => {
    let saved = localStorage.getItem(key);
    return saved && JSON.parse(saved);
  }
  const strParams = JSON.stringify(params);

  const store = writable(new Promise(_ => {}));
  const load = async (retries = 0) => {
    let error = false;
    let response = await func(...params).catch(err => {
      console.error("Request error", err, ...params);
      error = true;
      if (retries >= maxRetries) {
        store.set(Promise.reject("Error during fetch"))
      } else {
        console.log("Retrying the last request, retries left:", maxRetries - retries)
        setTimeout(async _ => load(retries + 1), timeout);
      }
    })
    if (!error) {
      console.log('Successful request')
      store.set(Promise.resolve(response));
      if (cache){
        cacheIt(strParams, JSON.stringify(response))
      }
    }
  }

  if (cache){
    let data = getCache(strParams);
    if (data){
      console.log('Using cache')

      if (typeof data == 'string'){
        data = JSON.parse(data);
      }
      store.set(Promise.resolve(data))
      return store
    }
  }
  load()
  return store;
}

const example = {"username": "goMstT", "password": "4vy2rp", "player": "darksoul"};