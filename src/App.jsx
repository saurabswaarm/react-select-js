import EnhancedSelect from "./EnhancedSelect";

const App = () => {
  const urlgen = (page) => {
    return `https://api.instantwebtools.net/v1/passenger?page=${page}&size=10`;
  };
  return (
    <div>
      <EnhancedSelect loadurl={urlgen} />
    </div>
  );
};

export default App;
