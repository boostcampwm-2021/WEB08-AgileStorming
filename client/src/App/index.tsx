import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Global, ThemeProvider } from '@emotion/react';
import { LoginPage, KanbanPage, ProjectPage, MindmapPage, CalendarPage, ChartPage } from 'pages';
import { common, global } from 'styles';

const App = () => {
  return (
    <ThemeProvider theme={common}>
      <Global styles={global} />
      <Switch>
        <Route path='/project' component={ProjectPage} />
        <Route path='/mindmap/:roomId' component={MindmapPage} />
        <Route path='/kanban/:roomId' component={KanbanPage} />
        <Route path='/calendar/:roomId' component={CalendarPage} />
        <Route path='/chart/:roomId' component={ChartPage} />
        <Route path='/' component={LoginPage} />
      </Switch>
    </ThemeProvider>
  );
};

export default App;
