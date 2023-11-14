import Books from "@/components/Books";

export default function page() {
  return (
    <div>
      <h1 className={"text-center text-4xl font-bold my-7"}>
        Welcome to Our Books
      </h1>

      <Books />
    </div>
  );
}
