import BasicLayout from "components/BasicLayout";
import PageMain from "components/PageMain";
import { IDefaultProps } from "./_app";

/** @format */
interface IProps extends IDefaultProps {}

const Index: React.FC<IProps> = ({ isAuthenticated, user }) => {
  return (
    <BasicLayout isAuthenticated={isAuthenticated} user={user}>
      <PageMain />
    </BasicLayout>
  );
};

export default Index;
