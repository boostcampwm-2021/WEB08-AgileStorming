import { Global, ThemeProvider } from '@emotion/react';
import loadable from '@loadable/component';
import { Route, Switch, Redirect } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { SpinnerBackground, Toast } from 'components/atoms';
import { Header } from 'components/organisms';
import { GlobalModal } from 'components/templates/GlobalModal';
import { common, global } from 'styles';
import { TPageComponent } from 'types/page';

interface IProps {
  page: TPageComponent;
}

const AsyncPage = loadable(({ page }: IProps) => import(`pages/${page}`), {
  cacheKey: ({ page }) => page,
  fallback: <SpinnerBackground />,
});

const App = () => {
  return (
    <ThemeProvider theme={common}>
      <RecoilRoot>
        <Global styles={global} />
        <Header />
        <Switch>
          <Route path='/' exact render={() => <AsyncPage page={'Login'} />} />
          <Route path='/project' render={() => <AsyncPage page={'Project'} />} />
          <Route path='/mindmap/:projectId' render={() => <AsyncPage page={'Mindmap'} />} />
          <Route path='/history/:projectId' render={() => <AsyncPage page={'History'} />} />
          <Route path='/kanban/:projectId' render={() => <AsyncPage page={'Kanban'} />} />
          <Route path='/calendar/:projectId' render={() => <AsyncPage page={'Calendar'} />} />
          <Route path='/chart/:projectId' render={() => <AsyncPage page={'Chart'} />} />
          <Route path='/backlog/:projectId' render={() => <AsyncPage page={'Backlog'} />} />
          <Redirect from='*' to='/' />
        </Switch>
        <GlobalModal />
        <Toast />
      </RecoilRoot>
    </ThemeProvider>
  );
};

export default App;
