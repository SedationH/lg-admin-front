export const get = function(
  key: string,
  storage: Storage = sessionStorage
) {
  // getItem(key: string): string | null;

  const value = storage.getItem(key)
  let data

  if (typeof value === 'string') {
    try {
      data = JSON.parse(value)
    } catch (e) {
      data = value
    }
  } else {
    data = value
  }

  return data
}

export const set = function(
  key: string,
  value: any,
  storage: Storage = sessionStorage
) {
  if (typeof value === 'object') {
    storage.setItem(key, JSON.stringify(value))
  } else {
    storage.setItem(key, value)
  }
}

export const remove = function(
  key: string,
  storage: Storage = sessionStorage
) {
  storage.removeItem(key)
}
