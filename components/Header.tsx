import * as React from "react";
import Link from "next/link";
import styled from "styled-components";
import { getLeftTime } from "uilts/common";
import { IDefaultProps } from "pages/_app";

interface IProps extends IDefaultProps {
  today: Date;
  tomorrow: Date;
}

const Header: React.FC<IProps> = ({
  isAuthenticated,
  user,
  today,
  tomorrow,
}) => {
  const [timeDiff, setTimeDiff] = React.useState(
    tomorrow.getTime() - today.getTime(),
  );

  React.useEffect(() => {
    const id = setInterval(() => {
      setTimeDiff((prev) => prev - 1000);
    }, 1000);

    return () => {
      clearInterval(id);
    };
  }, [today, tomorrow]);

  const leftTimeStr = React.useMemo(() => {
    const { hoursStr, minutesStr, secondsStr } = getLeftTime(timeDiff);

    return `${hoursStr}시간 ${minutesStr}분 ${secondsStr}초 남았습니다`;
  }, [timeDiff]);

  return (
    <HeaderContainer>
      <div className="logo">
        <i aria-hidden className="fab fa-github"></i>
      </div>
      <div className="left-time">
        {typeof window !== "undefined" ? leftTimeStr : null}
      </div>
      <div className="user-info">
        {isAuthenticated ? (
          <div className="logged">
            <img src={user?.avatarUrl} alt={user?.username} />
            <div className="links">
              <a href={`https://github.com/${user?.username}`} target="blank">
                {user?.username}
              </a>
              <Link href="/logout">
                <a>로그아웃</a>
              </Link>
            </div>
          </div>
        ) : (
          <Link href="/auth">
            <a>로그인</a>
          </Link>
        )}
      </div>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.header`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.bg};
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  font-size: 18px;
  z-index: 2;

  .user-info {
    justify-self: flex-end;
    & > a {
      display: block;
      border-radius: 5px;
      padding: 5px 10px;
      background-color: ${({ theme }) => theme.colors.btn};
    }
    .logged {
      position: relative;

      img {
        border-radius: 15px;
        width: 25dpx;
        height: 25px;
      }

      .links {
        padding: 10px 0px;
        right: 0px;
        top: 30px;
        display: none;
        position: absolute;
        background-color: #fff;
        border: 1px solid #e1e4e8;
        border-radius: 6px;
        box-shadow: 0 8px 24px rgba(149, 157, 165, 0.2);
        font-size: 14px;

        &::after {
          border-left: 10px solid transparent;
          border-right: 10px solid transparent;
          border-bottom: 10px solid #fff;
          content: "";
          position: absolute;
          top: -5px;
          right: 0px;
        }
        a {
          padding: 5px 20px;
          box-shadow: none;
        }
        a:hover {
          background-color: #2ecc71;
        }
      }

      &:hover .links {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        justify-content: center;
      }
    }
  }
`;

export default Header;
