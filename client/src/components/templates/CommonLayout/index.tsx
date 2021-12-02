import { useState } from 'react';
import FilterButton from './FilterButton';
import { LeftInfo, RightInfo, Template } from './style';
import { NodeDetailPopup, UserListPopup, FilterPopup } from 'components/organisms';
import useAuthentication from 'hooks/useAuthentication';
import useProject from 'hooks/useProject';
import useSocketSetup from 'hooks/useSocketSetup';

interface IProps {
  refProp?: React.MutableRefObject<HTMLDivElement | null>;
}

const CommonLayout: React.FC<IProps> = ({ children, refProp }) => {
  const [DisplayFilter, setDisplayFilter] = useState(false);

  const handleClickFilterPopupClose = () => setDisplayFilter(false);
  useAuthentication();
  useProject();
  useSocketSetup();

  const handleClickFilterButton = () => setDisplayFilter(true);

  return (
    <Template ref={refProp}>
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
