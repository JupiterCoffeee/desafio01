import { Body } from "./components/Body";
import { Navbar } from "./components/Navbar";

export function App() {
  return (
    <>
      <Navbar />
      <main className="w-[46rem] m-auto">
        <Body />
      </main>
    </>
  )
}


