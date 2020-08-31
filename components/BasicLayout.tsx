import * as React from "react";
import Header from "./Header";
import Footer from "./Footer";

interface IProps {}

const BasicLayout: React.FC<IProps> = ({ children }) => {
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
      {children}
      <Footer />
    </div>
  );
};

export default BasicLayout;
