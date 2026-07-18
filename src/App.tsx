// Imports From Refine
import { Authenticated, Refine } from "@refinedev/core";
import { DevtoolsProvider } from "@refinedev/devtools";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";
import { useNotificationProvider } from "@refinedev/antd";
import "@refinedev/antd/dist/reset.css";
import routerProvider, {
  CatchAllNavigate,
  DocumentTitleHandler,
  UnsavedChangesNotifier,
} from "@refinedev/react-router";
import { App as AntdApp } from "antd";

//////////////////////////////////////////
/////////////////////////////////////////

// Imports Pages That I Made
import { BrowserRouter, Outlet, Route, Routes } from "react-router";
import { authProvider, dataProvider, liveProvider } from "./providers";
import {
  Home,
  ForgotPassword,
  Login,
  Register,
  CompaniesList,
  CreateCompany,
  EditCompany,
  TasksList,
  TasksEditPage,
  TasksNewPage,
} from "./pages";
import LayOut from "./component/layout/layout";
import { Resources } from "./resources/resource";

function App() {
  return (
    <BrowserRouter>
      <RefineKbarProvider>
        <AntdApp>
          <DevtoolsProvider>
            <Refine
              dataProvider={dataProvider}
              liveProvider={liveProvider}
              notificationProvider={useNotificationProvider}
              routerProvider={routerProvider}
              authProvider={authProvider}
              resources={Resources}
              options={{
                syncWithLocation: true,
                warnWhenUnsavedChanges: true,
                projectId: "T3CRlW-VCi4wj-LnHPyl",
                liveMode: "auto",
              }}>
              <Routes>
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/forget-password" element={<ForgotPassword />} />

                <Route
                  element={
                    <Authenticated
                      key="authenticated-layout"
                      fallback={<CatchAllNavigate to="/login" />}>
                      <LayOut>
                        <Outlet />
                      </LayOut>
                    </Authenticated>
                  }>
                  <Route index element={<Home />} />

                  <Route path="/companies">
                    <Route index element={<CompaniesList />} />
                    <Route path="new" element={<CreateCompany />} />
                    <Route path="edit/:id" element={<EditCompany />} />
                  </Route>

                  <Route
                    path="/tasks"
                    element={
                      <TasksList>
                        <Outlet />
                      </TasksList>
                    }>
                    <Route path="new" element={<TasksNewPage />} />
                    <Route path="edit/:id" element={<TasksEditPage />} />
                  </Route>
                </Route>
              </Routes>
              <RefineKbar />
              <UnsavedChangesNotifier />
              <DocumentTitleHandler />
            </Refine>
          </DevtoolsProvider>
        </AntdApp>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;
