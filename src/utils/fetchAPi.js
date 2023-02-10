export default async function fetchApi(url) {
  const response = await fetch(url);
  const apiJson = await response.json();
  return apiJson;
}
