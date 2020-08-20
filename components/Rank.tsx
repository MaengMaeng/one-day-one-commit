import * as React from "react";
import styled from "styled-components";
import { IRank } from "./PageMain";

interface IProps {
  info: IRank;
}

const Rank: React.FC<IProps> = ({ info }) => {
  return (
    <RankContainer>
      <h4>{info.rank}위</h4>
      <div>
        <img src={info.avatarUrl} alt={info.username} />
        <a href={`https://github.com/${info.username}`} target="blank">
          {info.username}
        </a>
      </div>
      <h5>{info.commitDays}일 동안 커밋중</h5>
    </RankContainer>
  );
};

const RankContainer = styled.div`
  width: 500px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  border-radius: 10px;
  background-color: #ecf0f1;

  img {
    border-radius: 15px;
    width: 20px;
    height: 20px;
  }
`;

export default Rank;
