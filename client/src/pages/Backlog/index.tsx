import { Wrapper } from 'components/atoms';
import { BacklogTable } from 'components/organisms';
import CommonLayout from 'components/templates/CommonLayout';

const Backlog = () => {
  return (
    <CommonLayout>
      <Wrapper flex={'columnCenter'}>
        <BacklogTable />
      </Wrapper>
    </CommonLayout>
  );
};

export default Backlog;
