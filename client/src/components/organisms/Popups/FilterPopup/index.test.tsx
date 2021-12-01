import { fireEvent, render } from '@testing-library/react';
import { ThemeProvider } from '@emotion/react';
import { RecoilRoot } from 'recoil';
import FilterPopup from './index';
import { labelListState, sprintFilterState, sprintListState, userListState } from 'recoil/project';
import { common } from 'styles';

describe('필터링 팝업에서', () => {
  const renderFilterPopup = () => {
    return render(
      <ThemeProvider theme={common}>
        <RecoilRoot
          initializeState={(snap) => {
            snap.set(sprintListState, {
              1: { id: 1, name: '스프린트1', color: '2E25EB', startDate: '2021-10-13', endDate: '2021-11-12' },
            });
            snap.set(userListState, {
              aa: { id: 'aa', name: '1번손님', color: '6ED5EB', icon: 'frog' },
            });
            snap.set(labelListState, {
              1: { id: 1, name: '라벨1', color: '4A6CC3' },
            });
            snap.set(sprintFilterState, 1);
          }}
        >
          <FilterPopup onClose={() => {}} />
        </RecoilRoot>
      </ThemeProvider>
    );
  };

  it('초기에는 스프린트 리스트를 보여준다.', () => {
    const { queryByText } = renderFilterPopup();
    expect(queryByText('스프린트1')).toBeInTheDocument();
  });

  it('다른 메뉴를 클릭 시 스프린트를 표기하지 않는다.', () => {
    const { container, queryByText } = renderFilterPopup();
    fireEvent.click(container.querySelectorAll('span')[1]);
    expect(queryByText('스프린트0')).toBeNull();
  });

  it('담당자 메뉴 클릭 시 유저 리스트 표기한다.', () => {
    const { container, queryByText } = renderFilterPopup();
    fireEvent.click(container.querySelectorAll('span')[1]);
    expect(queryByText('1번손님')).toBeInTheDocument();
  });

  it('라벨 메뉴 클릭 시, 라벨 리스트를 표기한다.', () => {
    const { container, queryByText } = renderFilterPopup();
    fireEvent.click(container.querySelectorAll('span')[2]);
    expect(queryByText('라벨1')).toBeInTheDocument();
  });

  it('적용된 필터를 표시한다.', () => {
    const { container } = renderFilterPopup();
    expect(container.querySelector('p')).toHaveTextContent('필터링: 스프린트1');
  });
});
