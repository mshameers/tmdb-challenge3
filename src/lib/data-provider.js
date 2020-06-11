import {Router} from "wpe-lightning-sdk";
import {getMovies, getSeries, getAllGenres} from './api';
import {PAGES as PAGES} from './routes'

/**
 *  bind a data request to a specific route, before a page load
 *  the router will test for any data-binding. If there is, it will
 *  wait for the promise to resolve and load the correct page.
 *
 * @see docs: https://github.com/rdkcentral/Lightning-SDK/blob/feature/router/docs/plugins/router.md
 *
*/
export default () => {

    Router.boot(async()=> {
        // this will always be called

    });

    Router.before(PAGES.MOVIES, async ({page})=>{
        page.data = await getMovies();
    }, 10 * 60 /* expires */);

    Router.before(PAGES.SERIES, async ({page})=>{
        page.data = await getSeries();
    }, 10 * 60 /* expires */);
}