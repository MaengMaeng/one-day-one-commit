import * as React from "react";
import Link from "next/link";
import styled from "styled-components";
import { getLeftTime } from "utils/common";
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
            <a href={`https://github.com/${user?.username}`} target="blank">
              {user?.username}
            </a>
            <img src={user?.avatarUrl} alt={user?.username} />
            <Link href="/logout">
              <a>로그아웃</a>
            </Link>
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
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  font-size: 18px;

  .user-info {
    a {
      border-radius: 5px;
      padding: 5px 10px;
      background-color: ${({ theme }) => theme.colors.btn};
      color: black;
      transition: all 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);
      &:hover {
        background-color: ${({ theme }) => theme.colors.btn_hover};
      }
    }
    .logged {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 10px;

      img {
        border-radius: 15px;
        width: 20px;
        height: 20px;
      }
    }
  }
`;

export default Header;
