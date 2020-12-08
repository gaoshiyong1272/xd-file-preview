'use strict';

import app from '@/main';
import page from '@/views/@entryname@';
import store from "@/store";

store.commit('changePage', '@pathname@');
store['dispatch']('appInit', function () {
    app.mount(page);
});

