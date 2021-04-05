import {writable} from 'svelte/store';
export const url = 'http://localhost:8000'

export function retryWrapper(func, ...params) {
  const store = writable(new Promise(_ => {}));
  const maxRetries = 5;
  const timeout = 0;
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
    }
  }
  //  TODO cache optional
  load()
  return store;
}

const loginData = {"type": "LOGIN", "name": "goMstT", "password": "4vy2rp", "locale": "en_US"};
const user_data = {"type": "JOIN_ARCHIVE_REQUEST", "name": "darksoul"};