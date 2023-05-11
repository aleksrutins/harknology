import { App } from "vue";
import XCard from './x-card.vue';

export default (app: App) => {
    app.component('x-card', XCard)

    return app
}