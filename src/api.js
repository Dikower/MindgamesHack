import {writable} from 'svelte/store';
import axios from 'axios';


export function storeFetch(url, params) {
  const store = writable(new Promise(() => {
  }));

  const load = async (retries = 0) => {
    let error = false;
    let message = '';
    let response = await fetch(url, params).catch(err => {
      error = true;
      message = err
    });

    if (response && response.status !== 200 || error) {
      if (retries > 2) {
        store.set(Promise.reject("Error during fetch"))
        return;
      }
      console.error("Request error", message, response && response.text(), url, params);
      setTimeout(async _ => response = await load(retries + 1), 500);
    }
    //  TODO cache optional
    store.set(Promise.resolve(response))
  };
  load()
  return store;
}

export function post(url, json) {
  return storeFetch(url, {
    method: "post",
    credentials: 'include',
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      // 'Set-Cookie': 'JSESSIONID=F868D36C8F2A874DD0A9717B99E04DAA'
    },
    body: JSON.stringify(json)
  })
}

export function get(url) {
  return storeFetch(url, {
    method: "GET",
  })
}

export function escapeUnicode(s) {
  let ret = "";
  let code;
  for (let i = 0; i < s.length; i++) {
    code = s.charCodeAt(i);
    if (code < 128) {
      ret += s.charAt(i);
    } else {
      ret += "\\u" + ("0000" + code.toString(16)).substr(-4);
    }
  }
  return ret;
}

export function XMLPost(url, json, opts) {
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();
    let onError = () => {
      let errorType = xhr.status ? "noClient" : "networkError";
      reject("err");
    };
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          resolve();
        } else {
          onError();
        }
      }
    };
    xhr.addEventListener("error", onError);
    xhr.addEventListener("abort", onError);
    xhr.addEventListener("timeout", onError);
    xhr.open(
      "POST",
      url,
      true
      // opts.sync === undefined ? true : opts.sync
    );
    xhr.withCredentials = true;
    xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");
    xhr.send(JSON.stringify(json));
  });
}