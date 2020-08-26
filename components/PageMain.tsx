import * as React from "react";
import styled from "styled-components";
import Rank from "./Rank";
import Axios from "axios";
import { debounce } from "lodash";
interface IProps {
  ranks: IRank[];
}

export interface IRank {
  username: string;
  email: string;
  avatarUrl: string;
  rank: number;
  commitDays: number;
}

const PageMain: React.FC<IProps> = ({ ranks }) => {
  const [loading, setLoading] = React.useState(false);
  const [rankArr, setRankArr] = React.useState(ranks);

  const rankList = React.useMemo(
    () =>
      rankArr.map((rank) => <Rank key={rank.username + "-key"} info={rank} />),
    [rankArr],
  );

  const onScroll = debounce(async () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      if (!loading) {
        setLoading(true);
        const ranks = await Axios.get("http://localhost:3000/api/ranks?next=2");
        const ranksData = ranks.status === 200 ? ranks.data : [];
        setRankArr((p) => p.concat(...ranksData));
        setLoading(false);
      }
    }
  }, 500);

  React.useEffect(() => {
    document.addEventListener("scroll", onScroll);

    return () => {
      document.removeEventListener("scroll", onScroll);
    };
  }, []);
  return (
    <MainContainer onScroll={onScroll}>
      <div className="rank-list">{rankList}</div>
      <div className="update-info">
        <button className="btn-update">
          <i className="fas fa-sync"></i>
        </button>
        <span>Updated at 17:47</span>
      </div>
      <Loading loading={loading ? 1 : 0}>Loading...</Loading>
    </MainContainer>
  );
};

const MainContainer = styled.div`
  position: relative;
  padding: 60px 0;
  background-color: white;
  z-index: 1;

  .rank-list {
    display: flex;
    flex-direction: column;
    gap: 20px;
    align-items: center;
    height: 100%;
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

const Loading = styled.div<{ loading: number }>`
  opacity: ${(p) => p.loading};
  font-size: 20px;
  font-weight: 600;
`;

export default PageMain;
