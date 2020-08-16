import styled from "styled-components";

const Footer: React.FC<IProps> = () => {
  return (
    <FooterContainer>
      <div className="developers">
        <Developer>
          <img src="https://avatars0.githubusercontent.com/u/37009133?s=400&u=3998f5edfd907a527fbd8cac4d532026e91ae734&v=4" />
          <a href="https://github.com/minimal1" target="blank">
            minimal1
          </a>
        </Developer>
        <Developer>
          <img src="https://avatars3.githubusercontent.com/u/31842031?s=460&u=e5e2ae35e4920730fea38c0c36d2765c8cdd44b4&v=4" />
          <a href="https://github.com/MaengMaeng?tab=following" target="blank">
            MaengMaeng
          </a>
        </Developer>
      </div>
    </FooterContainer>
  );
};

const FooterContainer = styled.footer`
  position: fixed;
  width: 100%;
  bottom: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px;
  background-color: ${({ theme }) => theme.colors.bg};

  .developers {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
  }
`;

const Developer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  color: #927563;
  gap: 3px;

  img {
    border-radius: 15px;
    width: 20px;
    height: 20px;
  }

  a {
    position: relative;
    top: 2px;
    color: rgba(0, 0, 0, 0.6);
  }

  a:hover {
    color: blue;
  }
`;

export default Footer;
