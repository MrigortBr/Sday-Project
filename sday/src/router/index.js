import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView'
import RegisterView from "../views/RegisterView"
import HomeView from "../views/HomeView"
import NewView from "../views/NewView";
import SettingsView from "../views/SettingsView";
import CalendarView from "../views/CalendarView"
import SettingsProjectView from "../views/SettingsProjectView"
import TasksView from "../views/TasksView"
import UsersView from "../views/UsersView"
import inviteView from "../views/inviteView"
import chatView from "../views/ChatView"

const routes = [
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: "/register",
    name: "register",
    component: RegisterView
  },
  {
    path: "/",
    name: "home",
    component: HomeView
  },
  {
    path: "/settings",
    name: "settings",
    component: SettingsView
  },
  {
    path: "/new",
    name: "new",
    component: NewView
  },
  {
    path: "/projects/:id/calendar",
    name: "calendar",
    component: CalendarView
  },
  {
    path: "/projects/:id/settings",
    name: "settingsProject",
    component: SettingsProjectView
  },
  {
    path: "/projects/:id/tasks",
    name: "tasks",
    component: TasksView
  },
  {
    path: "/projects/:id/users",
    name: "users",
    component: UsersView
  },
  {
    path: "/projects/:code",
    name: "invite",
    component: inviteView
  },
  {
    path: "/projects/:id/chat",
    name: "chat",
    component: chatView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
