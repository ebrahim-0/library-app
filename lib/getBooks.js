export default async function getBooks(url) {
  const res = await fetch(url);

  return res.json();
}
