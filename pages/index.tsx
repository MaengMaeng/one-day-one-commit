import BasicLayout from "components/BasicLayout";
import PageMain, { IRank } from "components/PageMain";
import { IDefaultProps } from "./_app";
import { NextPage, NextPageContext } from "next";
import axios, { AxiosResponse } from "axios";

/** @format */
interface IProps extends IDefaultProps {
  ranks?: any[];
  isEnd?: boolean;
}

<<<<<<< HEAD
const Index: NextPage<IProps> = ({
  isAuthenticated,
  user,
  ranks = [],
  isEnd = false,
}) => {
  return (
    <BasicLayout isAuthenticated={isAuthenticated} user={user}>
      <PageMain ranks={ranks} isEnd={isEnd} />
=======
const Index: NextPage<IProps> = ({ isAuthenticated, user, ranksData }) => {
  // console.log(ranksData);
  return (
    <BasicLayout isAuthenticated={isAuthenticated} user={user}>
      <PageMain ranks={ranksData}/>
>>>>>>> b5061bd3294d3b2ebbdf6bcede7024c6fc8581a1
    </BasicLayout>
  );
};

Index.getInitialProps = async (ctx: NextPageContext) => {
  const res: AxiosResponse<{
    ranks: IRank[];
    isEnd: boolean;
  }> = await axios.get("http://localhost:3000/api/ranks?next=1");
  const ranksData = res.data;

<<<<<<< HEAD
  return { ...ranksData };
=======
  return { ranksData };
>>>>>>> b5061bd3294d3b2ebbdf6bcede7024c6fc8581a1
};
export default Index;
