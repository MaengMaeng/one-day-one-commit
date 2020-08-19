import * as React from "react";
import styled from "styled-components";
interface IProps {}
const PageMain: React.FC<IProps> = () => {
  return <MainContainer>Welcome</MainContainer>;
};

const MainContainer = styled.main`
  padding: 50px 0;
`;

export default PageMain;
