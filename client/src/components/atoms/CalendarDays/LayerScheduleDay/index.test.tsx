import { fireEvent } from '@testing-library/react';
import * as recoil from 'recoil';
import tasks from '../../../../../fixtures/tasks';
import LayerScheduleDay from '.';
import { testRender } from 'utils/test';

describe('달력의 스케쥴 레이어는', () => {
  const testDay = { year: 2021, month: 12, date: 23 };
  const setHoveredTask = jest.fn();

  const renderCalendar = () => testRender(<LayerScheduleDay dayDate={testDay} tasks={tasks} setHoveredNode={setHoveredTask} />);

  it('노드 번호와 함께 태스크를 출력한다.', () => {
    const { queryByText } = renderCalendar();
    expect(queryByText('#8 시작했는데 딜레이 되는 태스크')).toBeInTheDocument();
  });

  it('복수의 태스크를 모두 표기한다.', () => {
    const { container } = renderCalendar();
    expect(container.querySelectorAll('span')).toHaveLength(2);
  });

  it('hover시 해당 태스크를 인자로 setHover 함수를 호출한다.', () => {
    const { container } = renderCalendar();
    fireEvent.mouseEnter(container.querySelector('span')!);
    expect(setHoveredTask).toBeCalledWith(tasks[0]);
  });

  it('클릭시 해당 태스크를 상세정보창에 띄우도록 setState 호출한다.', () => {
    const setClickedTask = jest.fn();
    const useSetRecoilStateMock = jest.spyOn(recoil, 'useSetRecoilState');
    useSetRecoilStateMock.mockReturnValue(setClickedTask);
    const { container } = renderCalendar();
    fireEvent.click(container.querySelector('span')!);
    expect(setClickedTask).toBeCalled();
  });
});
