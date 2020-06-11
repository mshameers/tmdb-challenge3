import {Router} from "wpe-lightning-sdk";
import {PAGES as PAGES} from './routes'

export default () =>{
    Router.widget(PAGES.SPLASH);
    Router.widget(PAGES.MOVIES, ["Menu", "Logo"]);
    Router.widget(PAGES.SERIES, ["Menu", "Logo"]);
}