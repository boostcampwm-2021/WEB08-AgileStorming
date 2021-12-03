import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { HistoryBackground, HistoryBar } from 'components/organisms';
import useNewHistoryData from 'hooks/useNewHistoryData';
import { historyDataListState } from 'recoil/history';

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
