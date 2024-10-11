async function request<TResponse>(
  url: string,
  config: RequestInit
): Promise<TResponse> {
  const response = await fetch(url, config);
  return await response.json();
}

export const api = {
    get: <TResponse>(url: string, config:any = {}) =>
      request<TResponse>(url, config),

    // Using `extends` to set a type constraint:
    post: <TBody extends BodyInit, TResponse>(url: string, config:any = {}, body: TBody) => {
      config.method = 'POST';
      config.body = body;
      request<TResponse>(url, config)
      // request<TResponse>(url, {method: 'POST', body})
    },
}