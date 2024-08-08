import { getUserData } from "@/services/user";

export async function generateMetadata({ params }) {
  const { username } = params;
  const data = await getUserData(username);
  return {
    title: "AR Shootout",
    description: "Check out my score in AR Shootout!",
    openGraph: {
      title: "AR Shootout",
      description: "Check out my score in AR Shootout!",
      url: `https://shooter-frontend-zeta.vercel.app/${username}`,
      images: [
        {
          url: data?.image,
          width: 800,
          height: 600,
          alt: "Shared Score",
        },
      ],
    },
  };
}

const PreviewPage = async ({ params }) => {
  const { username } = params;

  const data = await getUserData(username);
  return (
    <>
      <div className="content">
        <img src={data?.image} alt="screenShot" />
      </div>
    </>
  );
};

export default PreviewPage;
