import BasicLayout from "components/BasicLayout";
import PageMain from "components/PageMain";
import { IDefaultProps } from "./_app";
import { NextPage, NextPageContext } from "next";
import axios from "axios";

/** @format */
interface IProps extends IDefaultProps {
  ranksData: any[];
}

const Index: NextPage<IProps> = ({ isAuthenticated, user, ranksData }) => {
  console.log(ranksData);
  return (
    <BasicLayout isAuthenticated={isAuthenticated} user={user}>
      <PageMain ranks={ranksData} />
    </BasicLayout>
  );
};

Index.getInitialProps = async (ctx: NextPageContext) => {
  const ranks = await axios.get("http://localhost:3000/api/ranks?next=1");
  const ranksData = ranks.status === 200 ? ranks.data : [];

  console.log(">>><<<", ranksData);
  return { ranksData };
};
export default Index;
