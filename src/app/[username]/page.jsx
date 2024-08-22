import { getUserData } from "@/services/user";
import Head from "next/head";

const PreviewPage = async ({ params }) => {
  const { username } = params;

  const data = await getUserData(username);
  return (
    <>
      <Head>
        <meta property="og:title" content="AR Shootout" />
        <meta
          property="og:description"
          content="Check out my score in AR Shootout!"
        />
        <meta property="og:image" content={data?.image} />
        <meta
          property="og:url"
          content="https://shooter-frontend-zeta.vercel.app/${username}"
        />
      </Head>
      <div className="content">
        <img src={data?.image} alt="screenShot" />
      </div>
    </>
  );
};

export default PreviewPage;
