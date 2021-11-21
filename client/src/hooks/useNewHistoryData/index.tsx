import { useSetRecoilState } from 'recoil';
import { historyDataListState } from 'recoil/history';
import { IHistoryData, THistoryRowData } from 'types/history';
import { API } from 'utils/api';
import { parseHistory } from 'utils/parser';
import useProjectId from 'hooks/useRoomId';
import useToast from 'hooks/useToast';
import { useCallback } from 'react';

const useNewHistoryData = () => {
  const setHistoryDataList = useSetRecoilState(historyDataListState);
  const projectId = useProjectId();
  const { showMessage } = useToast();

  const getNewHistoryData = useCallback(
    async (rangeFrom?: string) => {
      try {
        const historyRowData = await API.history.get(projectId, rangeFrom);
        if (!historyRowData.length) return showMessage('더이상 가져올 히스토리가 없습니다.');

        const historyData: IHistoryData[] = historyRowData.map((data: THistoryRowData) => parseHistory(data)).reverse();
        setHistoryDataList((prev: IHistoryData[]) => [...historyData, ...prev]);
      } catch (err) {
        console.log(err);
        showMessage('히스토리를 가져오지 못했습니다.');
      }
    },
    [projectId, showMessage]
  );

  return { getNewHistoryData };
};

export default useNewHistoryData;
