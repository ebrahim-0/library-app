import Link from "next/link";

export default function Footer() {
  return (
    <footer className="p-4 bg-[#007bb6] shadow md:px-6 md:py-8">
      <div className="sm:flex sm:items-center sm:justify-between">
        <Link href="" className="flex items-center mb-4 sm:mb-0">
          <img
            src="/logo.png"
            alt="logo"
            className="h-[60px] inline-block mr-2"
          />
        </Link>
        <ul className="flex flex-wrap items-center mb-6 sm:mb-0">
          <li>
            <Link
              href=""
              className="mr-4 text-sm text-white hover:underline md:mr-6"
            >
              About
            </Link>
          </li>
          <li>
            <Link
              href=""
              className="mr-4 text-sm text-white hover:underline md:mr-6"
            >
              Privacy Policy
            </Link>
          </li>
          <li>
            <Link
              href=""
              className="mr-4 text-sm text-white hover:underline md:mr-6"
            >
              Licensing
            </Link>
          </li>
          <li>
            <Link
              href=""
              className="mr-4 text-sm text-white hover:underline md:mr-6"
            >
              Contact
            </Link>
          </li>
        </ul>
      </div>
      <hr className="my-6 border-[.5px] sm:mx-auto lg:my-8" />
      <span className="block text-sm text-white sm:text-center">
        © 2023{" "}
        <Link href="" className="hover:underline">
          Information Technology and Computing™
        </Link>
        . All Rights Reserved.
      </span>
    </footer>
  );
}
