import { HistoryBackground, HistoryBar } from 'components/organisms';
import useNewHistoryData from 'hooks/useNewHistoryData';
import { useSetRecoilState } from 'recoil';
import { historyDataListState } from 'recoil/history';
import { useEffect } from 'react';

const HistoryPage = () => {
  const setHistoryDataList = useSetRecoilState(historyDataListState);

  const { getNewHistoryData } = useNewHistoryData();

  useEffect(() => {
    getNewHistoryData();
    return setHistoryDataList([]);
  }, []);

  return (
    <>
      <HistoryBackground />
      <HistoryBar />
    </>
  );
};

export default HistoryPage;
