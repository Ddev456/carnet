import { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { api } from "../../utils/api";
import { requireAuthentication } from "../../utils/requireAuthentication";
import { type Session } from "next-auth";

const Form = () => {
  const [name, setName] = useState("");
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
  if (session?.user.role === "ADMIN") {
  return (
    <form
      className="flex gap-2"
      onSubmit={(event) => {
        event.preventDefault();
        postMessage.mutate({
          name: name,
        });
        setName("");
      }}
    >
      <input
        type="text"
        className="rounded-md border-2 border-zinc-800 bg-neutral-900 px-4 py-2 focus:outline-none"
        placeholder="Légume à ajouter..."
        minLength={2}
        maxLength={100}
        value={name}
        onChange={(event) => setName(event.target.value)}
      />
      <button
        type="submit"
        className="rounded-md border-2 border-zinc-800 p-2 focus:outline-none"
      >
        Ajouter
      </button>
    </form>
  );
    }
    return <p>Accès refusé</p>
};

export default function Admin () {

    return (
        <Form/>
    )
}

export function getServerSideProps (context: GetServerSidePropsContext) {
// export async function getServerSideProps(context: any) {
  return requireAuthentication(context, (session) => {
    return {
      props: session
    }
  })
}

Admin.requireAuth = true