import { HistoryBackground, HistoryBar } from 'components/organisms';
import useProjectId from 'hooks/useRoomId';
import useToast from 'hooks/useToast';
import { useEffect } from 'react';
import { SetterOrUpdater, useSetRecoilState } from 'recoil';
import { historyDataListState } from 'recoil/history';
import { IHistoryData, THistoryRowData } from 'types/history';
import { API } from 'utils/api';
import { parseHistory } from 'utils/parser';

interface IParams {
  projectId: string;
  showMessage: (message: string) => void;
  setHistoryDataList: SetterOrUpdater<IHistoryData[]>;
}

const getNewHistoryData = async ({ projectId, showMessage, setHistoryDataList }: IParams) => {
  try {
    const historyRowData = await API.history.get(projectId);
    const historyData: IHistoryData[] = historyRowData.map((data: THistoryRowData) => parseHistory(data)).reverse();
    setHistoryDataList((prev: IHistoryData[]) => [...historyData, ...prev]);
  } catch (err) {
    console.log(err);
    showMessage('히스토리를 가져오지 못했습니다.');
  }
};

const HistoryPage = () => {
  const setHistoryDataList = useSetRecoilState(historyDataListState);
  const projectId = useProjectId();
  const { showMessage } = useToast();

  useEffect(() => {
    getNewHistoryData({ projectId, showMessage, setHistoryDataList });
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
