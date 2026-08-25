import { getUserData } from "@/services/user";

export const revalidate = 60;

export async function generateMetadata({ params }) {
  const { username } = params;
  let image = null;
  try {
    const data = await getUserData(username);
    image = data?.image;
  } catch (e) {
    // ignore — fall back to defaults
  }
  const url = `${process.env.PUBLIC_URL || ""}/${username}`;
  return {
    title: "AR Shootout",
    description: "Check out my score in AR Shootout!",
    openGraph: {
      title: "AR Shootout",
      description: "Check out my score in AR Shootout!",
      url,
      images: image ? [{ url: image }] : [],
    },
  };
}

const PreviewPage = async ({ params }) => {
  const { username } = params;

  const data = await getUserData(username);
  return (
    <div className="content">
      <img src={data?.image} alt="screenShot" />
    </div>
  );
};

export default PreviewPage;
