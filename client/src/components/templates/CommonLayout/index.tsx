import { useState } from 'react';
import FilterButton from './FilterButton';
import { LeftInfo, RightInfo, Template } from './style';
import { NodeDetailPopup, UserListPopup, Header, FilterPopup } from 'components/organisms';
import useSocketSetup from 'hooks/useSocketSetup';
import useProject from 'hooks/useProject';
import useAuthentication from 'hooks/useAuthentication';

interface IProps {
  refProp?: React.MutableRefObject<HTMLDivElement | null>;
}

const CommonLayout: React.FC<IProps> = ({ children, refProp }) => {
  const [DisplayFilter, setDisplayFilter] = useState(false);

  const handleClickFilterPopupClose = () => setDisplayFilter(false);
  useAuthentication();
  useSocketSetup();
  useProject();

  const handleClickFilterButton = () => setDisplayFilter(true);

  return (
    <Template ref={refProp}>
      <Header />

      <LeftInfo>
        <UserListPopup />
      </LeftInfo>
      <RightInfo>
        {DisplayFilter ? <FilterPopup onClose={handleClickFilterPopupClose} /> : <FilterButton onClick={handleClickFilterButton} />}
        <NodeDetailPopup />
      </RightInfo>
      {children}
    </Template>
  );
};

export default CommonLayout;
