import { useRouter } from "next/router";
import { useEffect } from "react";
import Layout from "../../components/Layout/Layout";

export default function Policies() {
  const router = useRouter();

  useEffect(() => {
    router.push("/policies/acl");
  }, []);

  return (
    <Layout title='Policies'>
      <h1 className="text-2xl text-black">Policies</h1>
    </Layout>
  )
}