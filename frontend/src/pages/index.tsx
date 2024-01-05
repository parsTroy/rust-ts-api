import UserInterface from "@/components/UserInterface";

export default function Home() {
  return (
    <main className="flex flex-wrap justify-center items-start min-h-screen bg-gray-800">
      <div className="m-4 md:w-[60%]">
        <UserInterface backendName="calm" />
      </div>
    </main>
  )
}
