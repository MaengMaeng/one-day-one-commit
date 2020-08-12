/** @format */
interface IProps {}

const Index: React.FC<IProps> = () => {
  return (
    <div>
      <div>
        <input type="checkbox" checked={true} readOnly />
        <span>eslint & prettier setting</span>
      </div>
      <div>
        <input type="checkbox" checked={true} readOnly />
        <span>Write readme & add styled-components</span>
      </div>
    </div>
  );
};

export default Index;
