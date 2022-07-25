import Head from "next/head";
import LocationFinder from "components/LocationFinder";
export default function Home() {
  return (
    <div>
      <Head>
        <title>Points of Interests</title>
        <meta
          name="description"
          content="Search for points of interest in the UK"
        />
      </Head>
      <LocationFinder />
    </div>
  );
}
