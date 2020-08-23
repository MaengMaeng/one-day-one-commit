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
  const rankList = ranks.map((rank) => (
    <Rank key={rank.username + "-key"} info={rank} />
  ));

  return (
    <MainContainer>
      <div className="rank-list">{rankList}</div>
      <div className="update-info">
        <button className="btn-update">
          <i className="fas fa-sync"></i>
        </button>
        <span>Updated at 17:47</span>
      </div>
    </MainContainer>
  );
};

const MainContainer = styled.main`
  position: relative;
  margin: 60px 0;
  background-color: white;
  z-index: 1;

  .rank-list {
    display: flex;
    flex-direction: column;
    gap: 20px;
    align-items: center;
  }

  .update-info {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: fixed;
    top: 60px;
    right: 10px;
    font-weight: 500;
    gap: 10px;

    span {
      font-size: 10px;
      color: rgba(0, 0, 0, 0.6);
    }

    .btn-update {
      width: fit-content;
      display: block;
      padding: 10px;
      background-color: #f1c40f;
      border: none;
      border-radius: 10px;
    }
  }
`;

export default PageMain;
