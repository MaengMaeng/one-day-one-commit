import BasicLayout from "components/BasicLayout";
import PageMain from "components/PageMain";

/** @format */
interface IProps {}

const Index: React.FC<IProps> = (props) => {
  console.log(props);
  return (
    <BasicLayout>
      <PageMain />
    </BasicLayout>
  );
};

export default Index;
