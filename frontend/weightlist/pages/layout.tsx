import Header from "@/components/header";
import Footer from "@/components/footer";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
export default function Layout({ children }) {
  return (
    <>
      <Header />
      <main className={"page"}>{children}</main>
      <Footer />
    </>
  )
}