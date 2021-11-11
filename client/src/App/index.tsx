import { Route, Switch, Redirect } from 'react-router-dom';
import { Global, ThemeProvider } from '@emotion/react';
import { RecoilRoot } from 'recoil';
import { LoginPage, KanbanPage, ProjectPage, MindmapPage, CalendarPage, ChartPage, HistoryPage } from 'pages';
import { common, global } from 'styles';
import GlobalModal from 'components/templates/GlobalModal';
import { Toast } from 'components/atoms';

const App = () => {
  return (
    <ThemeProvider theme={common}>
      <RecoilRoot>
        <Global styles={global} />
        <Switch>
          <Route path='/' exact component={LoginPage} />
          <Route path='/project' component={ProjectPage} />
          <Route path='/mindmap/:projectId' component={MindmapPage} />
          <Route path='/history/:projectId' component={HistoryPage} />
          <Route path='/kanban/:projectId' component={KanbanPage} />
          <Route path='/calendar/:projectId' component={CalendarPage} />
          <Route path='/chart/:projectId' component={ChartPage} />
          <Redirect from='*' to='/' />
        </Switch>
        <GlobalModal />
        <Toast />
      </RecoilRoot>
    </ThemeProvider>
  );
};

export default App;
