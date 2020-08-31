import * as React from "react";
import styled from "styled-components";
import { IRank } from "./PageMain";

interface IProps {
  info: IRank;
  me: boolean;
}

const Rank: React.FC<IProps> = ({ info, me = false }) => {
  const prize =
    info.rank === 1
      ? "gold"
      : info.rank === 2
      ? "silver"
      : info.rank === 3
      ? "bronze"
      : "etc";

  const percent = 100 * (info.commitDays / 365);
  return (
    <RankContainer>
      <a
        className={prize}
        href={`https://github.com/${info.username}`}
        target="blank"
      >
        <div className="rank-num">No.{info.rank}</div>
        <div className="user">
          <img src={info.avatarUrl} alt={info.username} />
          {info.username}
        </div>
        <div className="commit-days">+{info.commitDays}</div>
        <CommitProgress percent={percent} />
      </a>
      <Pointer isMe={me}>
        <i className="fas fa-long-arrow-alt-right"></i>
      </Pointer>
    </RankContainer>
  );
};

const RankContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  a {
    position: relative;
    width: 425px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    align-items: center;
    padding: 10px 20px;
    border-radius: 10px;
    background-color: white;
    border: 1px solid #ecf0f1;
    overflow: hidden;
    font-size: 16px;

    &.gold {
      width: 500px;
      padding: 18px 20px;
      border: 2px solid #ffd700;
      font-size: 22px;
    }

    &.silver {
      width: 475px;
      padding: 15px 20px;
      border: 1.5px solid #c0c0c0;
      font-size: 20px;
    }

    &.bronze {
      width: 450px;
      padding: 12px 20px;
      border: 1px solid #cd7f32;
      font-size: 18px;
    }

    .rank-num {
      z-index: 2;
    }
    .user {
      z-index: 2;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 10px;
      img {
        border-radius: 15px;
        width: 20px;
        height: 20px;
      }
    }
    .commit-days {
      z-index: 2;
      justify-self: flex-end;
    }
  }
`;

const CommitProgress = styled.div<{ percent: number }>`
  position: absolute;
  top: 0px;
  left: 0px;
  height: 100%;
  background-color: rgb(155, 233, 168, 0.8);
  width: ${(p) => `${p.percent}%`};
  z-index: 1;
`;

const Pointer = styled.div<{ isMe: boolean }>`
  display: ${(p) => (p.isMe ? "block" : "none")};
  position: absolute;
  left: -45px;
  font-size: 24px;
`;

export default Rank;
