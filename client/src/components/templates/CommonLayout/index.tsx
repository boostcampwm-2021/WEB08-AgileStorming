import { useState } from 'react';
import { LeftInfo, RightInfo, Template } from './style';
import { BoxButton } from 'components/atoms';
import { NodeDetailWrapper, UserList, Header, FilterPopup } from 'components/organisms';
import useSocketSetup from 'hooks/useSocketSetup';
import useProject from 'hooks/useProject';
import useAuthentication from 'hooks/useAuthentication';
import { filterIcon } from 'img';

const CommonLayout: React.FC = ({ children }) => {
  const [DisplayFilter, setDisplayFilter] = useState(false);
  const handleFilterButton = () => setDisplayFilter(true);
  const handleClickFilterPopupClose = () => setDisplayFilter(false);
  useAuthentication();
  useSocketSetup();
  useProject();

  return (
    <Template>
      <Header />

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
      {children}
    </Template>
  );
};

export default CommonLayout;
