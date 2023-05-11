import { App } from "vue";
import XCard from './x-card.vue';
import XModal from './x-modal.vue';

export default (app: App) => {
    app.component('x-card', XCard)
    app.component('x-modal', XModal)

    return app
}