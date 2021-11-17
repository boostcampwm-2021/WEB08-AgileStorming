import { HistoryBackground, HistoryBar } from 'components/organisms';
import useProjectId from 'hooks/useRoomId';
import useToast from 'hooks/useToast';
import { useEffect } from 'react';
import { SetterOrUpdater, useSetRecoilState } from 'recoil';
import { historyDataState, parseHistory, THistoryData } from 'recoil/history';
import { API } from 'utils/api';

interface IParams {
  projectId: string;
  showMessage: (message: string) => void;
  setHistoryData: SetterOrUpdater<THistoryData[]>;
}

const getNewHistoryData = async ({ projectId, showMessage, setHistoryData }: IParams) => {
  try {
    const historyData = await API.history.get(projectId);
    console.log(historyData.map((data: THistoryData) => parseHistory(data)));
    setHistoryData(historyData);
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
