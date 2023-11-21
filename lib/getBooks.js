export default async function getBooks() {
  const res = await fetch(`${process.env.BASE_URL}/api/book`, {
    cache: "no-cache",
  });

  return res.json();
}
