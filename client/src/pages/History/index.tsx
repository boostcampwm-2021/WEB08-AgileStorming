import { HistoryBackground, HistoryBar } from 'components/organisms';
import useProjectId from 'hooks/useRoomId';
import useToast from 'hooks/useToast';
import { useEffect } from 'react';
import { SetterOrUpdater, useSetRecoilState } from 'recoil';
import { historyDataState, parseHistory } from 'recoil/history';
import { IHistoryData, THistoryRowData } from 'types/history';
import { API } from 'utils/api';

interface IParams {
  projectId: string;
  showMessage: (message: string) => void;
  setHistoryData: SetterOrUpdater<IHistoryData[]>;
}

const getNewHistoryData = async ({ projectId, showMessage, setHistoryData }: IParams) => {
  try {
    const historyRowData = await API.history.get(projectId);
    const historyData: IHistoryData[] = historyRowData.map((data: THistoryRowData) => parseHistory(data));
    setHistoryData((prev: IHistoryData[]) => [...historyData, ...prev]);
  } catch (err) {
    console.log(err);
    showMessage('히스토리를 가져오지 못했습니다.');
  }
};

const HistoryPage = () => {
  const setHistoryData = useSetRecoilState(historyDataState);
  const projectId = useProjectId();
  const { showMessage } = useToast();

  useEffect(() => {
    getNewHistoryData({ projectId, showMessage, setHistoryData });
  }, []);

  return (
    <>
      <HistoryBackground />
      <HistoryBar />
    </>
  );
};

export default HistoryPage;
