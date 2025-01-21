import Head from "next/head";
import styles from "@/styles/Home.module.css";

export default function Home() {
  return (
    <>
      <Head>
        <title>Weightlist</title>
        <meta name="description" content="A workout and exercise managing and tracking app"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        {/*<link rel="icon" href="/favicon.ico" />*/}
      </Head>
      <div
        className={`${styles.page}`}
      >
        <main className={styles.main}>
          <h1>Weightlist</h1>
        </main>
      </div>
    </>
  );
}
