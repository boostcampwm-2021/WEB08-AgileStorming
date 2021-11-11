import { HistoryBackground, HistoryBar } from 'components/organisms';

const getHistoryData = () => {};

const HistoryPage = () => {
  const historyData = getHistoryData();

  return (
    <>
      <HistoryBackground />
      <HistoryBar />
    </>
  );
};

export default HistoryPage;
