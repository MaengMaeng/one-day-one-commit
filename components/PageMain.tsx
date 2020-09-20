import * as React from "react";
import styled from "styled-components";
import Rank from "./Rank";
import Axios, { AxiosResponse } from "axios";
import { debounce, delay } from "lodash";
import { UserContext } from "pages/_app";

enum STATUS {
  NORMAL,
  LOADING,
  UPDATE,
  ERROR,
  END,
}

interface IProps {
  ranks: IRank[];
  isEnd: boolean;
}

interface IStatus {
  statusNo: STATUS;
  detail: string;
}

export interface IRank {
  username: string;
  email: string;
  avatarUrl: string;
  rank: number;
  commitDays: number;
}

const PageMain: React.FC<IProps> = ({ ranks, isEnd }) => {
  const currentUser = React.useContext(UserContext);
  const [status, setStatus] = React.useState<IStatus>({
    statusNo: isEnd ? STATUS.END : STATUS.NORMAL,
    detail: "",
  });
  const [rankArr, setRankArr] = React.useState(ranks);
  const page = React.useRef(1);

  const update = React.useCallback(async () => {
    setStatus({ statusNo: STATUS.UPDATE, detail: "Updating..." });
    page.current = 1;
    try {
      const res: AxiosResponse<{
        ranks: IRank[];
        isEnd: boolean;
        leftTime: number;
      }> = await Axios.get(
        `http://localhost:3000/api/update?next=${page.current}`,
      );

      if (res.status !== 200) {
        throw Error("Error on server");
      }

      if (res.data.leftTime){
        console.log(res.data.leftTime)
        
        setStatus({
          statusNo: res.data.isEnd ? STATUS.END : STATUS.NORMAL,
          detail: "",
        });

        return;
      }

      delay(() => {
        if (!res.data.isEnd) {
          page.current += 1;
        }

        setRankArr(res.data.ranks);
        setStatus({
          statusNo: res.data.isEnd ? STATUS.END : STATUS.NORMAL,
          detail: "",
        });
      }, 2000);
    } catch (err) {
      setStatus({
        statusNo: STATUS.ERROR,
        detail: err,
      });
    }
  }, []);

  const rankList = React.useMemo(
    () =>
      rankArr.map((rank) => {
        const me =
          currentUser.isAuthenticated &&
          currentUser.user?.username === rank.username;
        return <Rank key={rank.username + "-key"} info={rank} me={me} />;
      }),
    [rankArr],
  );

  React.useEffect(() => {
    const onScroll = debounce(async () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        if (status.statusNo === STATUS.NORMAL) {
          try {
            setStatus({ statusNo: STATUS.LOADING, detail: "Loading..." });
            const res: AxiosResponse<{
              ranks: IRank[];
              isEnd: boolean;
            }> = await Axios.get(
              `http://localhost:3000/api/ranks?next=${page.current + 1}`,
            );

            if (res.status !== 200) {
              throw Error("Error on server");
            }

            delay(() => {
              if (!res.data.isEnd) {
                page.current += 1;
              }

              setRankArr((p) => p.concat(...res.data.ranks));
              setStatus({
                statusNo: res.data.isEnd ? STATUS.END : STATUS.NORMAL,
                detail: "",
              });
            }, 2000);
          } catch (err) {
            setStatus({
              statusNo: STATUS.ERROR,
              detail: err,
            });
          }
        }
      }
    }, 1000);

    document.addEventListener("scroll", onScroll);

    return () => {
      document.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <MainContainer>
      <div className="rank-list">{rankList}</div>
      <div className="update-info">
        <button className="btn-update" onClick={update}>
          <i className="fas fa-sync"></i>
        </button>
        {/* <span>Updated at 17:47</span> */}
      </div>
      <StatusBar status={status.statusNo}>{status.detail}</StatusBar>
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

const StatusBar = styled.div<{ status: STATUS }>`
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0px;
  left: 0px;
  z-index: 2;
  font-size: 20px;
  font-weight: 600;
  background-color: ${(p) => {
    switch (p.status) {
      case STATUS.LOADING:
      case STATUS.UPDATE:
      case STATUS.ERROR:
        return "rgba(0, 0, 0, 0.1)";
      default:
        return "white";
    }
  }};
  display: ${(p) => {
    switch (p.status) {
      case STATUS.LOADING:
      case STATUS.UPDATE:

      case STATUS.ERROR:
        return "flex";
      default:
        return "none";
    }
  }};
  justify-content: center;
  align-items: center;
  transition: all 0.5s ease-in-out;
`;
export default PageMain;
