/* eslint-disable @next/next/no-img-element */
export default function About() {
  return (
    <section className="container w-11/12 mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 p-8 my-14">
      <img
        src="/about.avif"
        alt=""
        className="rounded-md  h-[500px] w-full object-cover"
      />
      <div className="my-auto">
        <h3 className="text-4xl font-bold mb-12 mt-3 capitalize relative head">
          About US
        </h3>
        <p className="text-slate-500 leading-9">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ut mollitia
          laudantium nisi repellendus modi, dignissimos quasi esse! Fugit
          tempora sit obcaecati aut est fuga deleniti temporibus, quis molestias
          eum. Architecto.
        </p>
        <p className="text-slate-500 leading-9 pt-6">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ut mollitia
          laudantium nisi repellendus modi, dignissimos quasi esse! Fugit
          tempora sit obcaecati aut est fuga deleniti temporibus, quis molestias
          eum. Architecto.
        </p>
      </div>
    </section>
  );
}
