import BasicLayout from "components/BasicLayout";
import PageMain, { IRank } from "components/PageMain";
import { NextPage, NextPageContext } from "next";
import axios, { AxiosResponse } from "axios";

/** @format */
interface IProps {
  ranks?: any[];
  isEnd?: boolean;
}

const Index: NextPage<IProps> = ({ ranks = [], isEnd = false }) => {
  return (
    <BasicLayout>
      <PageMain ranks={ranks} isEnd={isEnd} />
    </BasicLayout>
  );
};

Index.getInitialProps = async (ctx: NextPageContext) => {
  const res: AxiosResponse<{
    ranks: IRank[];
    isEnd: boolean;
  }> = await axios.get("http://localhost:3000/api/ranks?next=1");
  const ranksData = res.data;

  return { ...ranksData };
};
export default Index;
