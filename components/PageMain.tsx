import * as React from "react";
import styled from "styled-components";
import Rank from "./Rank";
import axios from "axios";

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
  const [userRanks, setUserRanks] = React.useState(ranks);

  const update = async() => {
    const ranks = await axios.get("http://localhost:3000/api/update?next=1").then((ranks) => {
      const ranksData = ranks.status === 200 ? ranks.data : [];
      console.log(ranksData);
      setUserRanks(ranksData);
    });
  }

  return (
    <MainContainer>
      <button onClick={update}>update</button>
      {userRanks.map((rank) => (
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
