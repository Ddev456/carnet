import { signIn, signOut, useSession } from "next-auth/react";
import { useState } from "react";

import { api } from "../utils/api";

const VegetablesEntries = () => {
  const { data: vegetablesEntries, isLoading } = api.vegetable.getAll.useQuery();

  if (isLoading) return <div>Fetching messages...</div>;

  return (
    <div className="flex flex-col gap-4">
      {vegetablesEntries?.map((entry, index) => {
        return (
          <div key={index}>
            <span>- {entry.name}</span>
          </div>
        );
      })}
    </div>
  );
};

const Form = () => {
  const [message, setMessage] = useState("");
  const { data: session, status } = useSession();
  
  const utils = api.useContext();
  const postMessage = api.vegetable.postVegetable.useMutation({
    onMutate: async (newEntry) => {
      await utils.vegetable.getAll.cancel();
      utils.vegetable.getAll.setData(undefined, (prevEntries) => {
        if (prevEntries) {
          return [newEntry, ...prevEntries];
        } else {
          return [newEntry];
        }
      });
    },
    onSettled: async () => {
      await utils.vegetable.getAll.invalidate();
    },
  });
  
  if (status !== "authenticated") return null;

  return (
    <form
      className="flex gap-2"
      onSubmit={(event) => {
        event.preventDefault();
        postMessage.mutate({
          name: session.user?.name as string,
        });
        setMessage("");
      }}
    >
      <input
        type="text"
        className="rounded-md border-2 border-zinc-800 bg-neutral-900 px-4 py-2 focus:outline-none"
        placeholder="Your message..."
        minLength={2}
        maxLength={100}
        value={message}
        onChange={(event) => setMessage(event.target.value)}
      />
      <button
        type="submit"
        className="rounded-md border-2 border-zinc-800 p-2 focus:outline-none"
      >
        Submit
      </button>
    </form>
  );
};

const Home = () => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <main className="flex flex-col items-center pt-4">Loading...</main>;
  }

  return (
<main className="flex flex-col items-center">
  <h1 className="text-3xl pt-4">Guestbook</h1>
  <p>
    Tutorial for <code>create-t3-app</code>
  </p>
  <div className="pt-10">
  <div>
  {session ? (
    <>
      <p className="mb-4 text-center">hi {session.user?.name}</p>
      <button
        type="button"
        className="mx-auto block rounded-md bg-neutral-800 py-3 px-6 text-center hover:bg-neutral-700"
        onClick={() => {
          signOut().catch(console.log);
        }}
      >
        Logout
      </button>
      <div className="pt-6">
        <Form />
      </div>
    </>
  ) : (
    <button
      type="button"
      className="mx-auto block rounded-md bg-neutral-800 py-3 px-6 text-center hover:bg-neutral-700"
      onClick={() => {
        signIn("discord").catch(console.log);
      }}
    >
      Login with Discord
    </button>
  )}
  <div className="pt-10">
    <VegetablesEntries />
  </div>
</div>
  </div>
</main>
  );
};
export default Home;
