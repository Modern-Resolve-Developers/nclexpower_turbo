import { GetServerSideProps, NextPage } from "next";
import dynamic from "next/dynamic";
import { Layout as LayoutComponent } from "./Layout";
import React from "react";

interface Props {}

export const Page: NextPage<Props> = ({}) => {
  const Layout = dynamic<React.ComponentProps<typeof LayoutComponent>>(
    () => import("./Layout").then((c) => c.Layout),
    {
      ssr: false,
    }
  );
  return (
    <React.Fragment>
      <Layout />
    </React.Fragment>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  query,
  resolvedUrl,
}) => {
  try {
    return {
      props: {},
    };
  } catch (error) {
    return { props: { error } };
  }
};
