import * as React from "react";
import styled from "styled-components";
import Rank from "./Rank";
interface IProps {
  ranks: any[];
}
export interface IRank {
  username: string;
  email: string;
  avatarUrl: string;
  rank: number;
  commitDays: number;
}

const PageMain: React.FC<IProps> = ({ ranks }) => {
  return (
    <MainContainer>
      {ranks.map((rank) => (
        <Rank key={rank.username + "-key"} info={rank} />
      ))}
    </MainContainer>
  );
};

const MainContainer = styled.main`
  padding: 60px 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  background-color: #e67e22;
  height: 100vh;
`;

export default PageMain;
