import { App } from "vue";
import XCard from './x-card.vue';
import XDialog from './x-dialog.vue';

export default (app: App) => {
    app.component('x-card', XCard)
    app.component('x-dialog', XDialog)

    return app
}