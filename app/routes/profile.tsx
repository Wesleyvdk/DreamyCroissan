import { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { auth } from "~/auth.server";
import { Avatar, AvatarImage } from "~/components/ui/avatar";

export let loader: LoaderFunction = async ({ request }) => {
  return await auth.isAuthenticated(request, {});
};

export default function Profile() {
  const user = useLoaderData<typeof loader>();
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow container mx-auto px-6 py-8">
        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="flex items-center mb-6">
            <Avatar className="w-[100px] h-auto ">
              <AvatarImage
                src={`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}`}
              />
            </Avatar>
            <div>
              <h1 className="text-2xl font-bold">{user.displayName}</h1>
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
          <div>
            <h2 className="text-xl font-semibold mb-2">My Art</h2>
            {/* Add blog list component here */}
          </div>
        </div>
      </main>
    </div>
  );
}
