import {Router} from "wpe-lightning-sdk";

/**
 * @see docs: https://github.com/rdkcentral/Lightning-SDK/blob/feature/router/docs/plugins/router.md
 */

import {
     Main, Splash
} from '../pages';

export const PAGES = {
    SPLASH: 'splash',
    MOVIES: 'movies',
    SERIES: 'tv'
};

export default () =>{
    // define where the browser should point to on boot
    Router.root(PAGES.SPLASH, Splash);
    Router.route(PAGES.MOVIES, Main);
    Router.route(PAGES.SERIES, Main);

    Router.start();
}