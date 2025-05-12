import { Suspense } from "react";
import CreatePageSkeleton from "./_components/createPage/CreatePageSkeleton";
import RenderPage from "./_components/RenderPage";
import { onAuthenticateUser } from "@/actions/user";
import { redirect } from "next/navigation";

export default async function Page() {
  const checkUser = await onAuthenticateUser();

  if (!checkUser.user) {
    redirect('/sign-in');
  }

  if (!checkUser.user.subscription) {
    redirect('/dashboard');
  }

  return (
    <main className="h-full w-full pt-6">
      <Suspense fallback={<CreatePageSkeleton />}>
        <RenderPage />
      </Suspense>
    </main>
  );
}