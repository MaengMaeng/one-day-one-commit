import * as React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { IDefaultProps } from "pages/_app";

interface IProps extends IDefaultProps {}

const BasicLayout: React.FC<IProps> = ({ isAuthenticated, user, children }) => {
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
      <Header
        today={now}
        tomorrow={tomorrow}
        isAuthenticated={isAuthenticated}
        user={user}
      />
      {children}
      <Footer />
    </div>
  );
};

export default BasicLayout;
