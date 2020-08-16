import Header from "components/Header";
import Footer from "components/Footer";
import PageMain from "components/PageMain";

/** @format */
interface IProps {}

const Index: React.FC<IProps> = () => {
  const now: Date = new Date();
  const tomorrow: Date = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    24,
    0,
    0,
  );

  return (
    <div id="root">
      <Header today={now} tomorrow={tomorrow} />
      <PageMain />
      <Footer />
    </div>
  );
};

export default Index;
