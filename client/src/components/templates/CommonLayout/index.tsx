import { Suspense, useState } from 'react';
import { filterIcon } from 'img';
import { BoxButton } from 'components/atoms';
import { NodeDetailWrapper, UserList, Header, FilterPopup } from 'components/organisms';
import useSocketSetup from 'hooks/useSocketSetup';

import { Spinner } from 'components/molecules';

import { LeftInfo, RightInfo, Template } from './style';
import useProject from 'hooks/useProject';

interface IProps {
  children?: React.ReactNode;
}

const CommonLayout: React.FC<IProps> = ({ children }) => {
  useSocketSetup();
  const [DisplayFilter, setDisplayFilter] = useState(false);
  const handleFilterButton = () => setDisplayFilter(true);
  const handleClickFilterPopupClose = () => setDisplayFilter(false);
  useProject();

  return (
    <Template>
      <Header />
      <Suspense fallback={<Spinner />}>
        <LeftInfo>
          <UserList />
        </LeftInfo>
        <RightInfo>
          {DisplayFilter ? (
            <FilterPopup onClose={handleClickFilterPopupClose} />
          ) : (
            <BoxButton onClick={handleFilterButton} btnStyle={'normal'} margin='1rem 0 0 auto'>
              <img src={filterIcon} alt='필터링 버튼'></img>
              {'필터링'}
            </BoxButton>
          )}
          <NodeDetailWrapper />
        </RightInfo>
      </Suspense>
      {children}
    </Template>
  );
};

export default CommonLayout;
