export default function About() {
  return (
    <section className="container w-11/12 mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 p-8 my-14">
      <img
        src="/about.avif"
        alt=""
        className="rounded-md h-[500px] my-auto w-full object-cover"
      />
      <div className="my-auto">
        <h3 className="text-4xl font-bold mb-10 capitalize relative head">
          About US
        </h3>
        <p className="text-slate-500 leading-7">
          The manual library management system poses numerous challenges due to
          its heavy reliance on paperwork and manual calculation. These
          traditional methods lead to inconsistencies and inaccuracies in data
          maintenance, making it a time-consuming process that causes
          significant inconvenience to library staff. Moreover, the system’s
          limitations make it extremely difficult to locate a specific book or
          to edit the data of existing books.
        </p>
        <p className="text-slate-500 leading-7 pt-6">
          On the other hand, an automated library management system is a
          digitally advanced solution that efficiently organizes and maintains
          book information. This system makes it easier for students,
          researchers, and librarians to keep track of all the books that are
          currently available in the library. Furthermore, it allows users to
          easily lookup books using appropriate keywords, offering both simple
          and advanced search options. This system is designed with the needs of
          different users in mind, catering to specific majors and research
          requirements.
        </p>
      </div>
    </section>
  );
}
