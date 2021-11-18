import { Route, Switch, Redirect } from 'react-router-dom';
import { Global, ThemeProvider } from '@emotion/react';
import { RecoilRoot } from 'recoil';
import { common, global } from 'styles';
import { GlobalModal } from 'components/templates/GlobalModal';
import { Toast } from 'components/atoms';
import loadable from '@loadable/component';
import { Spinner } from 'components/molecules';

type TPage = 'Login' | 'Project' | 'Mindmap' | 'History' | 'Kanban' | 'Calendar' | 'Chart';
interface IProps {
  page: TPage;
}

const AsyncPage = loadable(({ page }: IProps) => import(`pages/${page}`), {
  cacheKey: ({ page }) => page,
  fallback: <Spinner />,
});

const App = () => {
  return (
    <ThemeProvider theme={common}>
      <RecoilRoot>
        <Global styles={global} />
        <Switch>
          <Route path='/' exact render={() => <AsyncPage page={'Login'} />} />
          <Route path='/project' render={() => <AsyncPage page={'Project'} />} />
          <Route path='/mindmap/:projectId' render={() => <AsyncPage page={'Mindmap'} />} />
          <Route path='/history/:projectId' render={() => <AsyncPage page={'History'} />} />
          <Route path='/kanban/:projectId' render={() => <AsyncPage page={'Kanban'} />} />
          <Route path='/calendar/:projectId' render={() => <AsyncPage page={'Calendar'} />} />
          <Route path='/chart/:projectId' render={() => <AsyncPage page={'Chart'} />} />
          <Redirect from='*' to='/' />
        </Switch>
        <GlobalModal />
        <Toast />
      </RecoilRoot>
    </ThemeProvider>
  );
};

export default App;
