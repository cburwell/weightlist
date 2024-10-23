async function request<TResponse>(
  url: string,
  config: RequestInit
): Promise<TResponse> {
  const response = await fetch(url, config);
  return await response.json();
}

export const api = {
  get: <TResponse>(url: string, config: any = {}) => {
    config.method = 'GET';
    return request<TResponse>(url, config)
  },

  // Using `extends` to set a type constraint:
  post: <TBody extends BodyInit, TResponse>(url: string, config: any = {}, body: TBody) => {
    config.method = 'POST';
    config.headers = {
      "Content-Type": "application/json",
    };
    config.body = body;
    return request<TResponse>(url, config)
  },

  put: <TBody extends BodyInit, TResponse>(url: string, config: any = {}, body: TBody) => {
    config.method = 'PUT';
    config.headers = {
      "Content-Type": "application/json",
    };
    config.body = body;
    return request<TResponse>(url, config)
  },

  delete: <TResponse>(url: string, config: any = {}) => {
    config.method = 'DELETE';
    return fetch(url, config);
  },
}