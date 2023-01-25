import { Fragment, ReactNode, useState } from "react";
import Head from "next/head";

import Footer from "./Footer";
import Header from "./Header";
import Sidebar from "./Sidebar";

interface LayoutProps {
  children: ReactNode;
  title?: string;
  styles?: string
}

export default function Layout({ children, title = "Sample Title", styles }: LayoutProps) {
  const [mobileNavsidebar, setMobileNavsidebar] = useState<boolean>(false);

  return (
    <Fragment>
      <Head>
        <title>{title}</title>
      </Head>
      <div className={`flex bg-gray-100 min-h-screen relative ${styles ? styles : ''}`}>
        <Sidebar mobileNavSidebar={mobileNavsidebar} />
        <div className="flex-grow text-gray-800">
          <Header mobileNavsidebar={mobileNavsidebar} setMobileNavsidebar={setMobileNavsidebar} />
          {children}
        </div>
        <Footer />
      </div>
    </Fragment>
  );
};
