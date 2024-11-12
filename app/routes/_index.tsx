import { Link } from "@remix-run/react";

export default function Index() {
  return (
    <>
      <section className="bg-blue-600 text-white py-20 rounded-lg">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl font-bold mb-4">
            Share Your Stories, Discover New Worlds
          </h1>
          <p className="text-xl mb-8">
            Join our community of writers and readers today!
          </p>
          <Link
            to="/signup"
            className="bg-white text-blue-600 px-6 py-3 rounded-full font-semibold text-lg hover:bg-gray-100"
          >
            Get Started
          </Link>
        </div>
      </section>
      <section className="py-12">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Featured Stories
          </h2>
          {/* Add featured stories component here */}
        </div>
      </section>
      <section className="bg-gray-200 py-12 rounded-lg">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Explore Genres
          </h2>
          {/* Add genre exploration component here */}
        </div>
      </section>
    </>
  );
}
