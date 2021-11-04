import { Route, Switch, Redirect } from 'react-router-dom';
import { Global, ThemeProvider } from '@emotion/react';
import { RecoilRoot } from 'recoil';
import { LoginPage, KanbanPage, ProjectPage, MindmapPage, CalendarPage, ChartPage } from 'pages';
import { common, global } from 'styles';
import GlobalModal from 'components/templates/GlobalModal';
import { Toast } from 'components/atoms';
import { Header } from 'components/molecules';

const App = () => {
  return (
    <ThemeProvider theme={common}>
      <RecoilRoot>
        <Global styles={global} />
        <Switch>
          <Route path='/' exact component={LoginPage} />
          <Header>
            <Route path='/project' component={ProjectPage} />
            <Route path='/mindmap/:roomId' component={MindmapPage} />
            <Route path='/kanban/:roomId' component={KanbanPage} />
            <Route path='/calendar/:roomId' component={CalendarPage} />
            <Route path='/chart/:roomId' component={ChartPage} />
          </Header>
          <Redirect from='*' to='/' />
        </Switch>
        <GlobalModal />
        <Toast />
      </RecoilRoot>
    </ThemeProvider>
  );
};

export default App;
