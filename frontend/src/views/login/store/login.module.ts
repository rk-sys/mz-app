import {Action, Module, Mutation, VuexModule} from 'vuex-module-decorators';
import cloneDeep from 'lodash/cloneDeep';
import {ILogin, ILoginForm} from '../login.interface';
import {mzLoginState} from './login.state';
import * as loginService from '../login.service';
import Notification from '@/components/notification/notifications';

@Module({namespaced: true, stateFactory: true})
export default class mzLoginModule extends VuexModule {
    public mzLoginState: ILogin = cloneDeep(mzLoginState);

    @Mutation
    public setErrorLoginForm(payload: boolean) {
        this.mzLoginState.errorLoginForm = payload;
    }

    @Mutation
    public setLogin(payload: string) {
        this.mzLoginState.loginForm.login = payload;
    }

    @Mutation
    public setPassword(payload: string) {
        this.mzLoginState.loginForm.password = payload;
    }

    @Action
    public getLoginForm() {
        return this.mzLoginState.loginForm;
    }

    @Action
    public async loginIntoService() {
        try {
            const request = this.context.dispatch('getLoginForm');
            await loginService.loginIntoService(request);
            Notification.successNotification('Sukces', 'poprawnie zalogowano do serwisu');
            this.context.commit('setErrorLoginForm', false);
        } catch (e) {
            Notification.errorNotification('Błąd', 'nieudało sie zalogować');
            this.context.commit('setErrorLoginForm', true);
            throw new Error(e);
        }
    }
}
