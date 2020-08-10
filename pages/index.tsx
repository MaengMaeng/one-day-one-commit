/** @format */
interface IProps {}

const Index: React.FC<IProps> = () => {
  return (
    <div>
      <input type="checkbox" checked={true} readOnly />
      <span>eslint & prettier setting</span>
    </div>
  );
};

export default Index;
