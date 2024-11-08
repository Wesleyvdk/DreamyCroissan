import Footer from "~/components/Footer";

export default function Profile() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow container mx-auto px-6 py-8">
        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="flex items-center mb-6">
            <img
              src="/placeholder.svg"
              alt="Profile"
              className="w-20 h-20 rounded-full mr-4"
            />
            <div>
              <h1 className="text-2xl font-bold">John Doe</h1>
              <p className="text-gray-600">Aspiring writer and avid reader</p>
            </div>
          </div>
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">My Stories</h2>
            {/* Add story list component here */}
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-2">My Blogs</h2>
            {/* Add blog list component here */}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
